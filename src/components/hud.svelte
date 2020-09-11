<script>
  export let scrollValues, scrollData
</script>

<style>
    .hud {
        position: absolute;
        top: 0;
        padding: 4px;
        font-size: 10px;
        z-index: 100;
        color: #ff0;
        background: rgba(0, 0, 0, 0.5);
    }
</style>

<div class="hud">
    toHomeRatio: {scrollValues.toHomeRatio}
    <br />
    toStartRatio: {scrollValues.toStartRatio}
    <br />
    toEndRatio: {scrollValues.toEndRatio}
    <br />
    toRangeRatio: {scrollValues.toRangeRatio}
    <br />
    fullRangePx: {scrollValues.fullRangePx}
    <br />
    toHomePx: {scrollValues.toHomePx}
    <br />
    toEndPx: {scrollValues.toEndPx}
    <br />
    toStartPx: {scrollValues.toStartPx}
    <br />
    --------
    <br />
    contentHeight: {scrollData.contentHeight}
    <br />
    containerHeight: {scrollData.containerHeight}
    <br />
    scrollPosPx: {scrollData.scrollPosPx}
    <br />
    endScrollPosPx: {scrollData.endScrollPosPx}
    <br />
    startScrollPosPx: {scrollData.startScrollPosPx}
    <br />
    homeScrollPos: {scrollData.homeScrollPos}
    <br />
    scrollDir: {scrollData.scrollDir}
    <br />
    animatingScroll: {scrollData.animatingScroll}
    <br />
</div>