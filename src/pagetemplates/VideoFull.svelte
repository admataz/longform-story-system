<script>
    import BgMedia from './BgMedia.svelte'
    import Scrollmation from '../components/scrollmation.svelte'
    import { quadOut as easing } from 'svelte/easing'
    export let chapter_number
    export let text_title
    export let text_subheading
    export let text_intro
    export let text_bodycopy
    export let image
    export let video
    export let bg_opacity
    export let isActive
    export let pgId

    let scrollInstance, scrollData
    export let scrollToPosition
    export let onNext = () => {}
    export let onPrev = () => {}
    export let onHome = () => {}

    export let isPrevNav = false

    function onScroll(evt) {
        scrollData = evt.detail
    }

    $: maskHeight = scrollData ? Math.abs(scrollData.toHomeRatio) * 50 : 100
    $: videoPaused = scrollData ? !isActive || maskHeight > 20 : true
    $: videoOpacity = scrollData ? 1 - Math.abs(scrollData.toHomeRatio) : 0
    // $: console.log(scrollData)
</script>

<style>
    .mask {
        background: #1e1e23;
        border-bottom: 0px solid white;
        border-top: 0px solid white;
        height: 100vh;
        width: 100%;
        position: absolute;
    }

    .full-screen {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    video {
        height: 100%;
        opacity: 1;
    }
</style>

<div class="mask" style="top:-1px; height: {maskHeight}%" />
<div class="mask" style="bottom:-1px; height:{maskHeight}%" />
<Scrollmation
    bind:this={scrollInstance}
    startPos={10}
    endPos={10}
    homePos={0}
    duration={1000}
    {easing}
    {isPrevNav}
    {scrollToPosition}
    on:next={onNext}
    on:prev={onPrev}
    on:home={onHome}
    on:scroll={onScroll}>

    <div slot="fg" class="fg full-screen " />

    <div slot="bg" class="full-screen media-video">
        <video autoplay={isActive} bind:paused={videoPaused} controls>
            <source src={video} />
        </video>
    </div>
</Scrollmation>
