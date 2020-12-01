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

    const linkPrefix = 'go-'
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
    <p>Aliquip nulla culpa esse deserunt irure reprehenderit cillum labore anim do. Ipsum deserunt eu amet aliqua pariatur sunt est Lorem. Sint pariatur excepteur labore pariatur eiusmod minim Lorem aliquip incididunt. Quis ipsum dolor veniam eiusmod consequat commodo mollit mollit excepteur culpa laboris aliquip. Quis ipsum fugiat nulla aliqua dolore excepteur nisi ut amet ipsum.</p>
    <p>In aliqua cupidatat quis magna esse veniam adipisicing nulla nisi Lorem sit commodo velit. In aliquip cillum officia aliquip eiusmod anim. Irure cillum voluptate deserunt non et irure mollit Lorem dolor sit. Aliquip proident elit reprehenderit amet anim qui veniam nostrud ad adipisicing culpa. Nulla non dolor cupidatat ullamco nisi sit.</p>
    <p>Ut culpa ea dolor veniam id in anim. Eiusmod aliquip in tempor enim sit sint reprehenderit eu. Duis eiusmod officia sunt veniam. Nostrud esse enim elit non voluptate. Consectetur laboris dolore aute pariatur cupidatat pariatur laboris ea ad exercitation nulla commodo. Veniam id excepteur amet cupidatat duis ut consectetur amet excepteur ex duis voluptate anim ea.</p>
    <p>Exercitation dolor aliqua eu esse commodo eiusmod aliqua ea. Laboris enim qui mollit esse enim id tempor sit nulla cillum do ullamco. Exercitation cillum reprehenderit ad id cupidatat aute dolore. Labore aute ipsum qui irure veniam cupidatat tempor cupidatat laborum pariatur ipsum in irure.</p>
    <p>Do id do sit velit consequat. Incididunt et cupidatat adipisicing cillum ipsum dolor fugiat eiusmod ut Lorem adipisicing. Do est deserunt fugiat aute incididunt eiusmod occaecat et. Non elit elit voluptate aute sunt nisi non ullamco sint aliquip.</p>
    <p>Dolor proident ut eiusmod irure amet. Excepteur proident duis consectetur qui culpa quis consectetur deserunt labore ad ullamco elit. Mollit non duis ea sunt labore sit labore sint ut Lorem.</p>
</div>
