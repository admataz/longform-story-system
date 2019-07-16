<script context="module">
    export async function preload({ params, path, query }) {
    // const res = await this.fetch(`${params.pgId}.json`)
    // const currentPageData = await res.json()
   
        return {
            // currentPageData,
            pgId: params.pgId,
        }
    }
</script>

<script>
    import { getContext } from 'svelte'
    import { goto, prefetch } from '@sapper/app'
    import marked from 'marked'
    import { fade } from 'svelte/transition'

    import { clickNavTo } from '../store/'
    import Scrollmation, {
        toHomeRatio,
        toStartRatio,
        toEndRatio,
        toRangeRatio,
        fullRangePx,
        toHomePx,
        toEndPx,
        toStartPx,
    } from '../components/scrollmation.svelte'
    import BgMedia from '../pagetemplates/BgMedia.svelte'
    import ChapterTitle from '../pagetemplates/ChapterTitle.svelte'
    import TextMediaSplit from '../pagetemplates/TextMediaSplit.svelte'
    import VideoFull from '../pagetemplates/VideoFull.svelte'
    import TextBgMedia from '../pagetemplates/TextBgMedia.svelte'
    import TextImage from '../pagetemplates/TextImage.svelte'
    import TextVideo from '../pagetemplates/TextVideo.svelte'
    import Measurement from '../pagetemplates/Measurement.svelte'
    import Wheel from '../components/wheel.svelte'
    import VideoInline from '../pagetemplates/VideoInline.svelte'

    const pages = getContext('pages')
    export let pgId, isPrevNav
    let canNav = true
    let scrollToPosition = null
    let scrollData
    let lastPage = null
    let okToNav = false
    let navTo = null

    const templates = {
        'chapter-title': ChapterTitle,
        'text-media-split': TextMediaSplit,
        'video-full': VideoFull,
        'text-bg-media': TextBgMedia,
        'text-image': TextImage,
        'text-video': TextVideo,
        'video-inline': VideoInline,
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
        scrollToPosition = pos
    }

    function onKeyDown({ key }) {
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            okToNav = true
            navTo = nextPage
            scrollTo('end')
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            okToNav = true
            navTo = prevPage
            scrollTo('start')
        }
    }

    function gotoPage(pg) {
        lastPage = currentPage
        currentPage = pages[pg]
        okToNav = false
        goto(pg)
        navTo = null
        $clickNavTo = null
    }

    function navNext() {
        if (!okToNav) {
            return
        }
        isPrevNav = false
        scrollToPosition = null
        if (navTo) {
            gotoPage(navTo)
        } else if (nextPage) {
            gotoPage(nextPage)
        }
    }

    function navPrev() {
        if (!okToNav) {
            return
        }
        isPrevNav = !!$clickNavTo ? false : true
        scrollToPosition = null
        if (navTo) {
            gotoPage(navTo)
        } else if (prevPage) {
            gotoPage(prevPage)
        }
    }

    function navHome(e) {
        okToNav = true
    }

    function onClickPrev() {
        okToNav = true
        scrollTo('start')
    }

    function onClickNext() {
        okToNav = true
        scrollTo('end')
    }

    function onClickNav(to) {
        okToNav = true
        navTo = to
        scrollTo('start')
    }

    function onScroll(evt) {
        scrollData = evt.detail
    }
    $: currentPage = pages[pgId]
    $: nextPage = currentPage ? currentPage._nav.next : null
    $: prevPage = currentPage ? currentPage._nav.prev : null
    $: pagesQueue = [pgId]
    // $: changeBg = shouldSwitchBg(lastPage, currentPage)
    // $: console.log(changeBg)
    $: currPageContent = formatPageData(pages[pgId])
    // $: nextNav = $clickNavTo
    $: doClick = $clickNavTo ? onClickNav($clickNavTo): null
</script>

<style>
    .nav {
        position: absolute;
        top: 0;
        z-index: 1000;
    }
</style>

<svelte:window on:keydown={onKeyDown} />

<div class="wheel1">
    <a href={prevPage} on:click|preventDefault={onClickPrev} rel="prefetch">
          
    </a>
</div>

<div class="wheel2">
    <a href={nextPage} on:click|preventDefault={onClickNext} rel="prefetch">
         
    </a>
</div>

<div class="bgitems">
    {#each Object.keys(pages) as p}
        {#if pagesQueue.includes(p)}
            <div class="bg-item {p === pgId ? 'active' : ''}" id="{`bg-${p}`}">
                <div transition:fade={{ delay: 0, duration: 800 }}>
                    <BgMedia
                        pageData={formatPageData(pages[p])}
                        isActive={p === pgId}
                        on:next={onClickNext}
                        on:prev={onClickPrev} />
                </div>
            </div>
        {/if}
    {/each}
</div>
<Scrollmation
    on:next={navNext}
    on:prev={navPrev}
    on:scroll={onScroll}
    on:home={navHome}
    {isPrevNav}
    {scrollToPosition}
    {pgId}>
    <!-- TODO: investigate useing let: to pass props values back up from the slot component -->
    <div slot="fg">

        {#each Object.keys(pages) as p}
            {#if pagesQueue.includes(p)}
                <svelte:component
                    this={templates[currentPage.template]}
                    pageData={currPageContent}
                    {scrollData}
                    isActive={true} />
            {/if}
        {/each}
    </div>

</Scrollmation>
