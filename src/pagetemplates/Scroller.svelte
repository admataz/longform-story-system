<script>
    import BgMedia from './BgMedia.svelte'
    import ChapterTitle from './ChapterTitle.svelte'
    import TextMediaSplit from './TextMediaSplit.svelte'
    import VideoFull from './VideoFull.svelte'
    import TextBgMedia from './TextBgMedia.svelte'
    import TextImage from './TextImage.svelte'
    import TextVideo from './TextVideo.svelte'
    import TextOnly from './TextOnly.svelte'
    import Measurement from './Measurement.svelte'
    import VideoInline from './VideoInline.svelte'

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

    import marked from 'marked'

    let scrolltoposition = null
    let scrollData = {}
    let scrollComponent

    export async function next() {
        isprevnav = false
        await scrollComponent.scrollToPos('end')
    }
    export async function prev() {
        isprevnav = true
        await scrollComponent.scrollToPos('start')
    }

    export async function toBeforeEnd() {
        isprevnav = false
        await scrollComponent.scrollToPos('beforeEnd')
    }

    export async function toBeforeStart() {
        isprevnav = true
        await scrollComponent.scrollToPos('beforeStart')
    }

    export let pageData
    export let isprevnav = false

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

    function onScroll(evt) {
        scrollData = evt.detail
        // console.log(`toHomeRatio: ${toHomeRatio(evt.detail)}`),
        //   console.log(`toStartRatio: ${toStartRatio(evt.detail)}`),
        //   console.log(`toEndRatio: ${toEndRatio(evt.detail)}`),
        //   console.log(`toRangeRatio: ${toRangeRatio(evt.detail)}`),
        //   console.log(`fullRangePx: ${fullRangePx(evt.detail)}`),
        //   console.log(`toHomePx: ${toHomePx(evt.detail)}`),
        //   console.log(`toEndPx: ${toEndPx(evt.detail)}`),
        //   console.log(`toStartPx: ${toStartPx(evt.detail)}`);
    }

    $: slug = pageData.slug
    $: template = pageData.template
    $: chapter_number = pageData.chapter_number
    $: text_title = pageData.text_title
    $: text_subheading = pageData.text_subheading
    $: text_bodycopy = marked(pageData.text_bodycopy)
    $: text_intro = marked(pageData.text_intro)
    $: text_navintro = pageData.text_navintro
    $: image = pageData.image
    $: video = pageData.video
    $: bg_opacity = pageData.bg_opacity

    $: rotatingStyle = scrollData
        ? `transform: rotate(${toRangeRatio(scrollData)}turn)`
        : ''

    $: progressBarStyle = scrollData
        ? `height: ${(1 - toEndRatio(scrollData)) * 100}%`
        : ''
</script>

<style>

    .scroller {
        height: 100%;
        position: absolute;
        z-index: 20;
    }

</style>


<div class="scroller">
    <Scrollmation
        homepos={150}
        endpos={400}
        startpos={200}
        pgId={slug}
        on:next
        on:prev
        on:home
        on:scroll={onScroll}
        bind:this={scrollComponent}
        {isprevnav}>

        <svelte:component
            this={templates[pageData.template]}
            {pageData} />

        
    </Scrollmation>
</div>
