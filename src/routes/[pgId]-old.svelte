<script context="module">
    export async function preload({ params, path, query }) {
        return {
            pgId: params.pgId,
        }
    }
</script>

<script>
    import { getContext } from 'svelte'
    import { goto, prefetch } from '@sapper/app'
    import marked from 'marked'
    import { fade } from 'svelte/transition'
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'
    import Scrollmation, {
        toHomeRatio,
        toStartRatio,
        toEndRatio,
        toRangeRatio,
        fullRangePx,
        toHomePx,
        toEndPx,
        toStartPx,
    } from 'svelte-scrollmation/scrollmation.svelte'

    import { clickNavTo } from '../store/'

    // page layout templates
    import BgMedia from '../pagetemplates/BgMedia.svelte'
    import ChapterTitle from '../pagetemplates/ChapterTitle.svelte'
    import TextMediaSplit from '../pagetemplates/TextMediaSplit.svelte'
    import VideoFull from '../pagetemplates/VideoFull.svelte'
    import TextBgMedia from '../pagetemplates/TextBgMedia.svelte'
    import TextImage from '../pagetemplates/TextImage.svelte'
    import TextVideo from '../pagetemplates/TextVideo.svelte'
    import TextOnly from '../pagetemplates/TextOnly.svelte'
    import Measurement from '../pagetemplates/Measurement.svelte'
    import Wheel from '../components/wheel.svelte'
    import VideoInline from '../pagetemplates/VideoInline.svelte'

    import Bg from '../components/bg.svelte'
    import BgVideo from '../components/bg-video.svelte'
    import FullscreenVideo from '../components/fullscreen-video.svelte'

    const pages = getContext('pages')
    const pgData = getContext('pgData')

    export let pgId
    export let isprevnav = false
    let canNav = true
    let scrolltoposition = null
    let scrollData
    let lastPage = null
    let okToNav = false
    let navTo = null
    let doFade = false
    let TRANSITON_DURATION = 900 // TODO: look at ways to make this configurable from loaded content

    let waitTimer = null

    const templates = {
        'chapter-title': ChapterTitle,
        'text-media-split': TextMediaSplit,
        'video-full': VideoFull,
        'text-bg-media': TextBgMedia,
        'text-image': TextImage,
        'text-video': TextVideo,
        'video-inline': VideoInline,
        'text-only': TextOnly,
        measurement: Measurement,
    }

    function formatPageData(page) {
        if (!page) {
            return null
        }
        return {
            ...page,
            text_intro: marked(page.text_intro || ''),
            text_bodycopy: marked(page.text_bodycopy || ''),
        }
    }

    function scrollTo(pos) {
        scrolltoposition = pos
    }

    function onKeyDown({ key }) {
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            if (!nextPage) {
                return
            }
            okToNav = true
            navTo = nextPage
            scrollTo('end')
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            if (!prevPage) {
                return
            }
            okToNav = true
            navTo = prevPage
            scrollTo('start')
        }
    }

    function gotoPage(pg) {
        // TODO: This is a hack and neeeds more sophisticated thinking.
        // to stop skipping pages when content dimensions change between loads...
        if (!okToNav && currentPage.template !== 'video-full') {
            return
        }

        clearTimeout(waitTimer)
        lastPage = currentPage
        currentPage = pages[pg]
        okToNav = false
        goto(pg)
        navTo = null
        $clickNavTo = null

        // to avoid getting trapped on a page if home location is never reached
        waitTimer = setTimeout(() => {
            okToNav = true
        }, TRANSITON_DURATION)
    }

    async function navNext(e) {
        isprevnav = false
        scrolltoposition = null

        if (navTo) {
            gotoPage(navTo)
        } else if (nextPage) {
            gotoPage(nextPage)
        }
    }

    async function navPrev(e) {
        scrolltoposition = null
        isprevnav = true
        if (navTo) {
            gotoPage(navTo)
        } else if (prevPage) {
            isprevnav = true
            gotoPage(prevPage)
        }
    }

    function navHome(e) {
        okToNav = true
    }

    function onClickPrev() {
        if (!prevPage) {
            return
        }
        okToNav = true
        scrollTo('start')
    }

    function onClickNext() {
        if (!nextPage) {
            return
        }
        okToNav = true
        scrollTo('end')
    }

    function onClickNav(to) {
        okToNav = true
        navTo = to
        if (Number(pgId) < Number(navTo)) {
            scrollTo('end')
        } else {
            scrollTo('start')
        }
    }

    function onScroll(evt) {
        scrollData = evt.detail
    }

    $: currentPage = pages[pgId]
    $: nextPage = currentPage ? currentPage._nav.next : null
    $: prevPage = currentPage ? currentPage._nav.prev : null
    $: pagesQueue = [pgId]
    $: currPageContent = formatPageData(currentPage)
    $: doClick = $clickNavTo ? onClickNav($clickNavTo) : null
</script>

<style>
    .static-content {
        position: absolute;
        z-index: -1;
        top: 110vh;
    }
    .container {
        width: 100%;
    }
</style>

<svelte:window on:keydown={onKeyDown} />

<svelte:head>
    <title>{currPageContent.text_title}</title>
</svelte:head>

<div class="static-content">
    <TextOnly pageData={currPageContent} />
</div>

{#if currPageContent.bg}
    <Bg pgData={currentPage} />
{:else if currPageContent.bg_video}
    <BgVideo pgData={currentPage} />
{/if}

{#if currentPage.template === 'video-full'}
    <FullscreenVideo
        pageData={currentPage}
        on:next={navNext}
        on:prev={navPrev} />
{:else}
    <div class="container">
        {currPageContent.text_title}
        <Scrollmation
            homepos={100}
            endpos={100}
            startpos={100}
            duration={TRANSITON_DURATION}
            on:next={navNext}
            on:prev={navPrev}
            on:scroll={onScroll}
            on:home={navHome}
            {isprevnav}
            {scrolltoposition}
            {pgId}>
            <svelte:component
                this={templates[currentPage.template]}
                {scrollData}
                pageData={currPageContent} />
        </Scrollmation>

    </div>
{/if}
