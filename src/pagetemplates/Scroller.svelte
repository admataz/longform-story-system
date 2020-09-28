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

    import Scrollmation from 'svelte-scrollmation/scrollmation.svelte'

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

    $: slug = pageData.slug
</script>

<Scrollmation
    homepos={150}
    endpos={400}
    startpos={200}
    pgId={slug}
    on:next
    on:prev
    on:home
    bind:this={scrollComponent}
    {isprevnav}>
    <svelte:component this={templates[pageData.template]} {pageData} />

</Scrollmation>
