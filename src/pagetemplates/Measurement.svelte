<script>
    import marked from 'marked'

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

    import Wheel from '../components/wheel.svelte'
    export let pageData
    export let scrollData
    // export let isActive

    $: rotatingStyle = scrollData
        ? `transform: rotate(${toRangeRatio(scrollData)}turn)`
        : ''

    $: progressBarStyle = scrollData
        ? `height: ${(1 - toEndRatio(scrollData)) * 100}%`
        : ''

    $: maskHeight = scrollData ? Math.abs(toHomeRatio(scrollData)) * 50 : 100

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
</script>

<style>
    .contentpanel {
      height: 210vh;
    }
    .progress-bar {
        width: 10px;
        background: #efefef;
        position: absolute;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .shapes {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
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
    <div class="progress-bar" style={progressBarStyle} />
    <Wheel {scrollData} />
</div>
<div class="contentpanel">
    hi  - experimental page. 
</div>
