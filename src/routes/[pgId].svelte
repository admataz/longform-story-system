<script context="module">
    export async function preload({ params, path, query }) {
        const res = await this.fetch(`${params.pgId}.json`)
        const pageData = await res.json()
        return {
            pageData,
            pgId: params.pgId,
        }
    }
</script>

<script>
    import { goto, prefetch } from '@sapper/app'
    import TextOnly from '../pagetemplates/TextOnly.svelte'
    import Scroller from '../pagetemplates/Scroller.svelte'
    import Bg from '../components/bg.svelte'
    import BgVideo from '../components/bg-video.svelte'
    import { clickNavTo } from '../store/'

    import FullscreenVideo from '../components/fullscreen-video.svelte'
    import ChapterTitle from '../pagetemplates/ChapterTitle.svelte'
    import TextBgMedia from '../pagetemplates/TextBgMedia.svelte'
    import SeaBoatNet from '../pagetemplates/SeaBoatNet.svelte'

    const templates = {
        'chapter-title': ChapterTitle,
        'text-bg-media': TextBgMedia,
        'video-full': FullscreenVideo,
        'sea-boat-net': SeaBoatNet,
    }

    export let pgId
    export let pageData

    const linkPrefix = ''
    let navTo = null
    let isprevnav = false
    let currentTemplateComponent
    let okToNav = true
    let waitTimer = null

    function onKeyDown({ key }) {
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            if (!pageData._nav.next) {
                return
            }
            currentTemplateComponent.next()
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            if (!pageData._nav.prev) {
                return
            }
            currentTemplateComponent.prev()
        }
    }

    function gotoPage(pg) {
        if(!pg){
          return
        }
        if (!okToNav) {
            return
        }
        clearTimeout(waitTimer)
        okToNav = false
        goto(`${linkPrefix}${pg}`)
        navTo = null
        $clickNavTo = null
        waitTimer = setTimeout(() => {
            okToNav = true
        }, 100)
    }

    function navNext(e) {
        isprevnav = false
        console.log('navNext')
        gotoPage(pageData._nav.next)
    }

    function navPrev(e) {
        isprevnav = true

        console.log('navPrev')
        gotoPage(pageData._nav.prev)
    }

    function navHome(e) {}

    function onClickNav(to) {
        okToNav = true
        navTo = to
        if (Number(pgId) < Number(navTo)) {
            currentTemplateComponent.toBeforeEnd().then(() => gotoPage(to))
        } else {
            currentTemplateComponent.toBeforeStart().then(() => gotoPage(to))
        }
    }

    $: if ($clickNavTo) onClickNav($clickNavTo)
</script>

<style>
    .container {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 20;
    }
</style>

<svelte:window on:keydown={onKeyDown} />

<svelte:head>
    <title>{pageData.text_title}</title>
</svelte:head>

{#if pageData.bg}
    <Bg {pgId} pgData={pageData} />
{:else if pageData.bg_video}
    <BgVideo {pgId} pgData={pageData} />
{/if}

<div class="container">
    <svelte:component
        this={templates[pageData.template]}
        {pageData}
        on:next={navNext}
        on:prev={navPrev}
        {isprevnav}
        on:home={navHome}
        bind:this={currentTemplateComponent} />
</div>
