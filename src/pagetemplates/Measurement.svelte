<script>
    import Scrollmation from '../components/scrollmation.svelte'
    import BgMedia from './BgMedia.svelte'

    import { cubicOut as easing } from 'svelte/easing'
    export let chapter_number
    export let text_title
    export let text_subheading
    export let text_intro
    export let text_bodycopy
    export let image
    export let video
    export let bg_opacity
    export let pgId
    export let isActive

    let scrollInstance, scrollData
    export let scrollToPosition
    export let onNext = () => {}
    export let onPrev = () => {}
    export let onHome = () => {}

    export let isPrevNav = false
    function onScroll(evt) {
        scrollData = evt.detail
    }

    $: rotatingSquareStyle = scrollData
        ? '' // `transform: rotate(${toRangeRatio(scrollData)}turn)`
        : ''

    $: progressBarStyle = scrollData
        ? '' // `height: ${(1 - toEndRatio(scrollData)) * 100}%`
        : ''

    // $: console.log(rotatingSquareStyle)

    /*
        contentHeight,
      containerHeight,
      scrollPos,
      endScrollPos,
      startScrollPos,
      homeScrollPos,
      scrollDir,
      toHomeRatio: (homeScrollPos - scrollPos)/(homeScrollPos - startScrollPos),
      toStartRatio: (scrollPos - startScrollPos)/(homeScrollPos - startScrollPos),
      toEndRatio: (scrollPos - endScrollPos)/(homeScrollPos - endScrollPos),
      toRangeRatio: (scrollPos - endScrollPos)/(startScrollPos - endScrollPos),
      fullRangePx: (endScrollPos - startScrollPos),
      toHomePx: (homeScrollPos - scrollPos),
      toEndPx: (endScrollPos - scrollPos),
      toStartPx: (startScrollPos - scrollPos)

      */
    const layers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
</script>

<style>
    .bodycopy {
        border: 1px solid #fff;
        height: auto;
        background-color: rgba(0, 0, 0, 0.5);
        width: 60%;
        margin: auto;
        padding: 10px;
    }
    .progress-bar {
        width: 10px;
        background: #efefef;
        position: absolute;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .rotating-square {
        border: 2px solid #f00;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 40px;
    }

    .parallax-container {
        position: fixed;
        bottom: 0;
        width: 2400px;
        height: 712px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .parallax-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        will-change: transform;
    }

    .parallax-container img:last-child::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgb(45, 10, 13);
    }
</style>

<div class="shapes">
    <div class="rotating-square" style={rotatingSquareStyle} />
    <div class="progress-bar" style={progressBarStyle} />
</div>
<Scrollmation
    bind:this={scrollInstance}
    startPos={10}
    endPos={10}
    homePos={300}
    duration={1000}
    {easing}
    {isPrevNav}
    {scrollToPosition}
    on:next={onNext}
    on:prev={onPrev}
    on:home={onHome}
    on:scroll={onScroll}
    {pgId}>
    <div class="contentpanel" slot="fg">
        {#if text_bodycopy}
            <div class="bodycopy">
                {@html text_bodycopy}
            </div>
        {:else}
            <div />
        {/if}
    </div>

    <div class="backgroundpanel" slot="bg">
        <BgMedia {image} {video} />
    </div>
</Scrollmation>
