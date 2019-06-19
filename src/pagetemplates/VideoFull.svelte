<script>
    export let pageData
    export let scrollData
    export let isActive
    import {
        toHomeRatio,
        toStartRatio,
        toEndRatio,
        toRangeRatio,
        fullRangePx,
        toHomePx,
        toEndPx,
        toStartPx,
    } from '../components/scrollmation.svelte'

    const {
        chapter_number,
        text_title,
        text_subheading,
        text_intro,
        text_bodycopy,
        image,
        video,
        bg_opacity,
    } = pageData

    $: maskHeight = scrollData ? Math.abs(toHomeRatio(scrollData)) * 50 : 100
    $: videoPaused = scrollData ? !isActive || maskHeight > 20 : true
    $: videoOpacity = scrollData ? 1 - Math.abs(toHomeRatio(scrollData)) : 0
    // $: console.log(scrollData)
</script>

<style>
    .mask {
        background: #1e1e23;
        border-bottom: 0px solid white;
        border-top: 0px solid white;
        height: 100vh;
        width: 100%;
        position: fixed;
    }

    .full-screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    video {
        height: 100%;
        opacity: 1;
    }
</style>



<div class="full-screen media-video">
    <video autoplay={isActive} bind:paused={videoPaused} controls>
        <source src={video} />
    </video>

</div>
<!-- 

<div class="mask" style="top:-1px; height: {maskHeight}%" />
<div class="mask" style="bottom:-1px; height:{maskHeight}%" /> -->