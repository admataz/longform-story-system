<script context="module">
    export async function preload({ params }) {
        const res = await this.fetch(`pages.json`)
        const pgData = await res.json()

        const pages = pgData.reduce((acc, page, index, arr) => {
            const p = {
                ...page,
                _nav: {
                    prev: index ? arr[index - 1].slug : null,
                    next: index + 1 < arr.length ? arr[index + 1].slug : null,
                },
            }
            acc[page.slug] = p
            return acc
        }, {})
        

        return {
            pages,
            pgId: params.pgId,
        }
    }
</script>


<script>
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

    export let pages, pagesObj, pgId, pgData, scrollToPos, isPrevNav
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
    $: pagesQueue = [prevPage, nextPage, pgId]

    // $: console.log({nextPage, prevPage, currentPage, pagesQueue})
    // $: console.log(currentPage.template)
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
      {#if prevPage}
        <a href={prevPage} on:click|preventDefault={onClickPrev} rel="prefetch">
             <Wheel {scrollData} />
        </a>
    {/if}
    </div>
    
    <div class="wheel2">
      {#if nextPage}
        <a href={nextPage} on:click|preventDefault={onClickNext} rel="prefetch">
             <Wheel {scrollData} />
        </a>
    {/if}
    </div>

<div class="bgitems">
    {#each Object.keys(pages) as p}
            {#if pagesQueue.includes(p)}
              <div class="bg-item" id="{`bg-${p}`}">
                {#if p===pgId}
                <div transition:fade={{ delay: 0, duration: 800 }}>
                    <BgMedia pageData={formatPageData(pages[p])} isActive={p===pgId}/>
                </div>
                {/if}
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
    <div slot="fg">
        <svelte:component
            this={templates[currentPage.template]}
            pageData={formatPageData(currentPage)}
            {scrollData}
            isActive={true} />
    </div>
</Scrollmation>
