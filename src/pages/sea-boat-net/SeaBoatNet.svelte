<script>
    import Hud from '../../components/hud.svelte'
    import Boat from './assets/boat.svg.svelte'
    import Fishet from './assets/fishnet.svg.svelte'
    import Wave from './assets/wave1.svg.svelte'
    import Hook from './assets/hook.svg.svelte'

    import { linear } from 'svelte/easing'

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

    let scrollData = {}

    function onScroll(evt) {
        scrollData = evt.detail
    }

    $: toEndRatioVal = (1 - toEndRatio(scrollData)) * 100

    $: scrollValues = {
        toHomeRatio: toHomeRatio(scrollData),
        toStartRatio: toStartRatio(scrollData),
        toEndRatio: toEndRatio(scrollData),
        toRangeRatio: toRangeRatio(scrollData),
        fullRangePx: fullRangePx(scrollData),
        toHomePx: toHomePx(scrollData),
        toEndPx: toEndPx(scrollData),
        toStartPx: toStartPx(scrollData),
    }
</script>

<style>
    .svgcontainer {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid #ff0;
    }
</style>

<Hud {scrollData} {scrollValues} />


<svg class="svgcontainer" viewBox="0 0 100 100">
    <Boat {scrollValues} {scrollData} />
    <Wave {scrollValues} {scrollData} startX={0} />
    <Wave {scrollValues} {scrollData} startX={20} />
    <Wave {scrollValues} {scrollData} startX={30} />
    <Fishet {scrollValues} {scrollData} />
    <Hook />
</svg>
<Scrollmation startpos={-500} endpos={0} homepos={0} on:scroll={onScroll} duration={1000}>

asdasd
</Scrollmation>
