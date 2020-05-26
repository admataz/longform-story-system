<script context="module">
    export async function preload({ params, path, query }) {
        const res = await this.fetch(`${params.pgId}.json`)
        const currentPageData = await res.json()

        return {
            currentPageData,
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
    } from 'svelte-scrollmation/Scrollmation.svelte'

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

    let interchange = tweened(1, {
        duration:400,
        easing: cubicOut,
    })

    const pages = getContext('pages')
    export let pgId
    export let currentPageData
    export let isprevnav = false
    let canNav = true
    let scrolltoposition = null
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
        'text-only': TextOnly,
        measurement: Measurement,
    }

    function fadeBGTransition(current, next){
      if(pages[current].image){
        if(pages[current].image === pages[next].image){
          return false
        }
      }

      if(pages[current].video){
        if(pages[current].video === pages[next].video){
          return false
        }
      }

      return true
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

    async function navNext(e) {
        if(fadeBGTransition(pgId, nextPage)){
          await interchange.set(0, {duration: 600})
        }
        isprevnav = false
        scrolltoposition = null

        if (navTo) {
            gotoPage(navTo)
        } else if (nextPage) {
            gotoPage(nextPage)
        }
        await interchange.set(1)
    }

    async function navPrev() {
        if(fadeBGTransition(pgId, prevPage)){
          await interchange.set(0, {duration: 600})
        }
        if (!okToNav) {
            return
        }
        isprevnav = !!$clickNavTo ? false : true
        scrolltoposition = null
        if (navTo) {
            gotoPage(navTo)
        } else if (prevPage) {
            gotoPage(prevPage)
        }
        await interchange.set(1)
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

    $: currPageContent = formatPageData(currentPageData)
    // $: nextNav = $clickNavTo
    $: doClick = $clickNavTo ? onClickNav($clickNavTo) : null
    $: toHome = $interchange
    // scrollData ? 1 - toHomeRatio(scrollData) || 1 : 0

</script>

<style>
    /* .nav {
        position: absolute;
        top: 0;
        z-index: 1000;
    } */
    .static-content {
        position: absolute;
        z-index: -1;
        top: 110vh;
    }
</style>

<svelte:window on:keydown={onKeyDown} />
<svelte:head>
<title>{currPageContent.text_title}</title>
</svelte:head>

<div class="static-content">
    <TextOnly pageData={currPageContent} />
</div>

<div class="bgitems">
    <!--   {#each Object.keys(pages) as p}
        {#if pagesQueue.includes(p)}
            <div class="bg-item active" id="{`bg-${p}`}"> 
    <div transition:fade={{ delay: 0, duration: 1800 }}>
        <BgMedia
            pageData={formatPageData(pages[pgId])}
            isActive={true}
            on:next={onClickNext}
            on:prev={onClickPrev} />
    </div>
    <!--             </div>
        {/if}
    {/each}-->

    <div style="opacity:{toHome} ">
        <BgMedia
            pageData={formatPageData(pages[pgId])}
            isActive={true}
            on:next={onClickNext}
            on:prev={onClickPrev} />
    </div>
</div>

<div class="container">
    <Scrollmation
        homepos={100}
        endpos={10}
        on:next={navNext}
        on:prev={navPrev}
        on:scroll={onScroll}
        on:home={navHome}
        {isprevnav}
        {scrolltoposition}
        {pgId}>

        <svelte:component
            this={templates[currentPage.template]}
            pageData={currPageContent} />

    </Scrollmation>

</div>
