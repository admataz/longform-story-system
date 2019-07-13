<script context="module">
    export async function preload({ params }) {
        return {
            pgId: params.pgId,
        }
    }
</script>


<script>
    import { getContext } from 'svelte';
    import { goto, prefetch } from '@sapper/app'
    import marked from 'marked'
    import { fade } from 'svelte/transition'
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
            scrollTo('end')
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            okToNav = true
            scrollTo('start')
        }
    }

    async function navNext(e) {
        if(!okToNav){
          return
        }
        isPrevNav = false
        scrollToPosition = null
        if (nextPage) {
            lastPage = currentPage
            currentPage = pages[nextPage]
            prefetch(pages[nextPage]._nav.next)
            okToNav = false
            goto(nextPage)
        }
    }

    async function navPrev(e) {
        if(!okToNav){
          return
        }
        isPrevNav = true
        scrollToPosition = null
        if (prevPage) {
            lastPage = currentPage
            currentPage = pages[prevPage]
            prefetch(pages[prevPage]._nav.next)
            okToNav = false
            goto(prevPage)
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
</script>

<style>
  .nav {
    position: absolute;
    top:0;
    z-index: 1000;
  }
  .wheel2{
    bottom: 10px;
    right: 10px;
    position: absolute;
    z-index: 20000;
  }
  .wheel1{
    bottom: 10px;
    right: 40px;
    position: absolute;
    z-index: 20000;
  }
</style>


<svelte:window on:keydown={onKeyDown} />
    <div class="wheel1">
      {#if false}
        <a href={prevPage} on:click|preventDefault={onClickPrev} rel="prefetch">
             <Wheel {scrollData} />
        </a>
    {/if}
    </div>
    
    <div class="wheel2">
      {#if false}
        <a href={nextPage} on:click|preventDefault={onClickNext} rel="prefetch">
             <Wheel {scrollData} />
        </a>
    {/if}
    </div>

<div class="bgitems" >
    {#each Object.keys(pages) as p}
            {#if pagesQueue.includes(p)}
              <div class="bg-item {p===pgId ? 'active' : ''}" id="{`bg-${p}`}">
                <div transition:fade={{ delay: 0, duration: 800 }}>
                    <BgMedia pageData={formatPageData(pages[p])} isActive={p===pgId} on:next={navNext} on:prev={navPrev}/>
                </div>
            </div>
          {/if}
    {/each}
</div>

      {#each Object.keys(pages) as p}
            {#if pagesQueue.includes(p)}
<Scrollmation
    on:next={navNext}
    on:prev={navPrev}
    on:scroll={onScroll}
    on:home={navHome}
    {isPrevNav}
    {scrollToPosition}
    {pgId}>
 
    <div slot="fg">
        <svelte:component
            this={templates[currentPage.template]}
            pageData={currPageContent}
            {scrollData}
            isActive={true} />
    </div>

</Scrollmation>
    {/if}
    {/each}

