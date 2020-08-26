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
    import FullscreenVideo from '../components/fullscreen-video.svelte'
    import { clickNavTo } from '../store/'
    
    export let pgId
    export let pageData

    const linkPrefix = ''
    let navTo = null
    let isprevnav = false
    let scrollContentComponent, videoContentComponent
    let okToNav = true
    let waitTimer = null

    function onKeyDown({ key }) {
      const currComponent =
          pageData.template === 'video-full'
              ? videoContentComponent
              : scrollContentComponent
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            if (!pageData._nav.next) {
                return
            }
            currComponent.next()
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            if (!pageData._nav.prev) {
                return
            }
            currComponent.prev()
        }
    }

    function gotoPage(pg) {
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
        gotoPage(pageData._nav.next)
    }

    function navPrev(e) {
        isprevnav = true
        gotoPage(pageData._nav.prev)
    }

    function navHome(e) {}

    function onClickNav(to) {
      const currComponent =
        pageData.template === 'video-full'
            ? videoContentComponent
            : scrollContentComponent
        okToNav = true
        navTo = to
        if (Number(pgId) < Number(navTo)) {
            currComponent.toBeforeEnd().then(() => gotoPage(to))
        } else {
            currComponent.toBeforeStart().then(() => gotoPage(to))
        }
    }

    $: if($clickNavTo) onClickNav($clickNavTo)
</script>

<style>
    .container {
        height: 100%;
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

{#if pageData.template === 'video-full'}
    <FullscreenVideo
        {pageData}
        on:next={navNext}
        on:prev={navPrev}
        bind:this={videoContentComponent} />
{/if}
<div class="container">
    <Scroller
        {pageData}
        bind:this={scrollContentComponent}
        on:next={navNext}
        on:prev={navPrev}
        on:home={navHome}
        {isprevnav} />
</div>
