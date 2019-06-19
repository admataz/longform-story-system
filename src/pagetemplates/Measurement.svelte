<script>
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

    export let pageData
    export let scrollData
    export let isActive

    $: rotatingSquareStyle = scrollData
        ? `transform: rotate(${toRangeRatio(scrollData)}turn)`
        : ''

    $: progressBarStyle = scrollData
        ? `height: ${(1 - toEndRatio(scrollData)) * 100}%`
        : ''
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
    .shapes {
        position: fixed;
        top: 0;
        left: 0;
    }

    /* .parallax-container {
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
    } */
</style>

<div class="shapes">
    <div class="rotating-square" style={rotatingSquareStyle} />
    <div class="progress-bar" style={progressBarStyle} />
</div>
<div class="contentpanel">
    {#if pageData.text_bodycopy}
        <div class="bodycopy">
            {@html pageData.text_bodycopy}
        </div>
    {:else}
        <div />
    {/if}
</div>
