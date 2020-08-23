<script>
    export let pageData
    import {
        toHomeRatio,
        toStartRatio,
        toEndRatio,
        toRangeRatio,
        fullRangePx,
        toHomePx,
        toEndPx,
        toStartPx,
    } from 'svelte-scrollmation/scrollmation.svelte'

    $: slug = pageData.slug
    $: template = pageData.template
    $: chapter_number = pageData.chapter_number
    $: text_title = pageData.text_title
    $: text_intro = pageData.text_intro
    $: text_subheading = pageData.text_subheading
    $: text_bodycopy = pageData.text_bodycopy
    $: text_navintro = pageData.text_navintro
    $: image = pageData.image
    $: video = pageData.video
    $: bg_opacity = pageData.bg_opacity

</script>

<style>

    .full-screen {
        width: 100%;
        height: 300px;
        flex-direction: column;
        justify-content: center;
    }

    video {
        height: 150%;
        opacity: 1;
    }
</style>



<div class="full-screen media-video">

</div>

