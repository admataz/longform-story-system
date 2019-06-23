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

</script>

<style>

    .full-screen {
        width: 100%;
        height: 110vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* border:1px solid #fff; */
    }

    video {
        height: 150%;
        opacity: 1;
    }
</style>



<div class="full-screen media-video">
    <!-- <video autoplay={isActive} bind:paused={videoPaused} controls>
        <source src={video} />
    </video> -->

</div>

