<script context="module">
    export async function preload({ params }) {
        const res = await this.fetch(`pages.json`)
        const pgData = await res.json()
        const pages = pgData.map((page, index) => {
            return {
                ...page,
                _nav: {
                    prev: index ? pgData[index - 1] : null,
                    next: index + 1 < pgData.length ? pgData[index + 1] : null,
                },
            }
        })
        return {
            pages,
            pgId: params.pgId,
        }
    }
</script>

<script>
    
    import { goto } from '@sapper/app'
    import { fade } from 'svelte/transition'
    import marked from 'marked'
    // import ChapterTitle from '../pagetemplates/ChapterTitle.svelte'
    // import TextMediaSplit from '../pagetemplates/TextMediaSplit.svelte'
    // import VideoFull from '../pagetemplates/VideoFull.svelte'
    // import TextBgMedia from '../pagetemplates/TextBgMedia.svelte'
    // import TextImage from '../pagetemplates/TextImage.svelte'
    // import TextVideo from '../pagetemplates/TextVideo.svelte'
    import Measurement from '../pagetemplates/Measurement.svelte'

    export let pages, pgId, pgData, scrollToPos, isPrevNav
    let canNav = true
    let scrollToPosition = null


    const templates = {
        // 'chapter-title': ChapterTitle,
        // 'text-media-split': TextMediaSplit,
        // 'video-full': VideoFull,
        // 'text-bg-media': TextBgMedia,
        // 'text-image': TextImage,
        // 'text-video': TextVideo,
        measurement: Measurement,
    }

    function formatPageData (page){
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
            goto(nextPage.slug)
        }
    }

    async function navPrev(e) {
        isPrevNav = true
        scrollToPosition = null
        if (prevPage) {
            goto(prevPage.slug)
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

    $: currentPage = pages.find(p => p.slug === pgId)
    $: nextPage = currentPage ? currentPage._nav.next : null
    $: prevPage = currentPage ? currentPage._nav.prev : null
    $: pagesQueue = [currentPage].filter(p => p)
</script>

<style>
    .active {
        display: block;
    }
    .queued {
        display: none;
    }
</style>

<svelte:window on:keydown={onKeyDown} />

<div class="nav">
    {#if prevPage}
        <a
            href={prevPage.slug}
            on:click|preventDefault={onClickPrev}
            rel="prefetch">
            Prev
        </a>
    {/if}

    {#if nextPage}
        <a
            href={nextPage.slug}
            on:click|preventDefault={onClickNext}
            rel="prefetch">
            Next
        </a>
    {/if}
</div>

{#each pagesQueue as page}
    <div id={page.slug} class={page.slug === pgId ? 'active' : 'queued'}>
        <svelte:component
            this={templates[page.template]}
            {...formatPageData(page)}
            onNext={navNext}
            onPrev={navPrev}
            onHome={navHome}
            {scrollToPosition}
            {isPrevNav}
            pgId={page.slug}
            isActive={page.slug === pgId} />
    </div>
{/each}
