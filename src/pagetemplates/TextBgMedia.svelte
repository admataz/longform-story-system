<script>
    import BgMedia from './BgMedia.svelte'
    import Scrollmation, {toEndRatio} from '../components/scrollmation.svelte'
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

    $: bgOpacity = scrollData
        ? Math.abs(toEndRatio(scrollData) - 0.4)
        : bg_opacity
    // $: console.log(bgOpacity)

    // $: console.log(scrollData)

    /*
    containerHeight: 916
    contentHeight: 1413
    endScrollPos: 2339
    homeScrollPos: 826
    scrollDir: undefined
    scrollPos: 1071
    startScrollPos: 0
    */

    // $: console.log(bgOpacity)
    // $: fgOpacity = scrollData ? 1 - Math.abs(scrollData.homeScrollPos - scrollData.scrollPos)/ (scrollData.endScrollPos - scrollData.homeScrollPos): 0

    // $: bgOpacity2 = scrollData ? scrollData.scrollPos/scrollData.homeScrollPos : bg_opacity
    // $: if(scrollData) console.log(Math.abs(scrollData.homeScrollPos - scrollData.scrollPos))
    // $: if(scrollData) console.log(scrollData)
</script>

<style>
    .text-intro {
        max-width: 60%;
    }
    h1 {
        margin-top: 0;
        font-size: 46pt;
    }
    h1:after {
        content: '';
        border-bottom: 4px solid #ffa52a;
        display: block;
        width: 50%;
    }

    .content {
        max-width: 50%;
        margin: 40px;
    }
</style>

<Scrollmation
    bind:this={scrollInstance}
    startPos={10}
    homePos={100}
    endPos={0}
    duration={900}
    {easing}
    {isPrevNav}
    {scrollToPosition}
    on:next={onNext}
    on:prev={onPrev}
    on:home={onHome}
    on:scroll={onScroll}
    {pgId}>
    <div class="content" slot="fg">
        {#if chapter_number}
            <p>{chapter_number}</p>
        {/if}

        {#if text_title}
            <h1>{text_title}</h1>
        {/if}

        {#if text_subheading}
            <h2>{text_subheading}</h2>
        {/if}

        {#if text_intro}
            <div class="text-intro">
                {@html text_intro}
            </div>
        {/if}

        {#if text_bodycopy}
            <div class="text-bodycopy">
                {@html text_bodycopy}
            </div>
        {/if}
    </div>

    <div slot="bg">
        <BgMedia {image} {video} bg_opacity={1 - bgOpacity - 0.01} />

    </div>

</Scrollmation>
