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
    import { goto } from '@sapper/app'
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
    export let pages, pagesObj, pgId, pgData, scrollToPos, isPrevNav
    let canNav = true
    let scrollToPosition = null
    let scrollData
    let lastPage = null

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
            scrollTo('end')
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            scrollTo('start')
        }
    }

    async function navNext(e) {
        isPrevNav = false
        scrollToPosition = null
        if (nextPage) {
            lastPage = currentPage
            currentPage = pages[nextPage]
            goto(nextPage)
        }
    }

    async function navPrev(e) {
        isPrevNav = true
        scrollToPosition = null
        if (prevPage) {
            lastPage = currentPage
            currentPage = pages[prevPage]
            goto(prevPage)
        }
    }

    function navHome(e) {
        // console.log(e)
    }

    function onClickPrev() {
        scrollTo('start')
    }

    function onClickNext() {
        scrollTo('end')
    }

    function onScroll(evt) {
        scrollData = evt.detail
    }

    $: currentPage = pages[pgId]
    $: nextPage = currentPage ? currentPage._nav.next : null
    $: prevPage = currentPage ? currentPage._nav.prev : null
    $: pagesQueue = [nextPage, prevPage, currentPage]
        .filter(p => p)
        .map(p => p.slug)
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="nav">
    {#if prevPage}
        <a href={prevPage} on:click|preventDefault={onClickPrev} rel="prefetch">
            Prev
        </a>
    {/if}

    {#if nextPage}
        <a href={nextPage} on:click|preventDefault={onClickNext} rel="prefetch">
            Next
        </a>
    {/if}
</div>

<div class="bgitems">
    {#each Object.keys(pages) as p}
        <div id="{`bg-${p}`}">
            {#if pagesQueue.includes(p)}
                <div transition:fade={{ delay: 0, duration: 800 }}>
                    <BgMedia pageData={formatPageData(pages[p])} />
                </div>
            {/if}
        </div>
    {/each}
</div>
<Scrollmation
    on:next={navNext}
    on:prev={navPrev}
    on:scroll={onScroll}
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
