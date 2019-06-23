<script context="module">
    export const toHomeRatio = ({
        homeScrollPos,
        scrollPosPx,
        startScrollPosPx,
    }) => (homeScrollPos - scrollPosPx) / (homeScrollPos - startScrollPosPx)

    export const toStartRatio = ({
        homeScrollPos,
        scrollPosPx,
        startScrollPosPx,
    }) => (scrollPosPx - startScrollPosPx) / (homeScrollPos - startScrollPosPx)

    export const toEndRatio = ({
        scrollPosPx,
        endScrollPosPx,
        homeScrollPos,
    }) => (scrollPosPx - endScrollPosPx) / (homeScrollPos - endScrollPosPx)

    export const toRangeRatio = ({
        scrollPosPx,
        endScrollPosPx,
        startScrollPosPx,
    }) => (scrollPosPx - endScrollPosPx) / (startScrollPosPx - endScrollPosPx)

    export const fullRangePx = ({ endScrollPosPx, startScrollPosPx }) =>
        endScrollPosPx - startScrollPosPx

    export const toHomePx = ({ homeScrollPos, scrollPosPx }) =>
        homeScrollPos - scrollPosPx

    export const toEndPx = (endScrollPosPx, scrollPosPx) =>
        endScrollPosPx - scrollPosPx

    export const toStartPx = (startScrollPosPx, scrollPosPx) =>
        startScrollPosPx - scrollPosPx
</script>

<script>
    import { afterUpdate, createEventDispatcher, onMount } from 'svelte'
    import { tweened } from 'svelte/motion'
    import { cubicOut, linear } from 'svelte/easing'
    const dispatch = createEventDispatcher()

    let contentHeight
    let containerHeight
    let container

    let scrollPosPx = 0
    let animatingScroll = false
    let endScrollPosPx
    let startScrollPosPx = 0
    let prevScrollPosPx
    let targetScollPx
    let scrollDir
    let targetPos = 'home'
    let loading = true

    export let startPos = 10 // px past the end
    export let homePos = 120 //px from the top
    export let endPos = 100 // px above the top
    export let duration = 800
    export let easing = cubicOut
    export let scrollData = {}
    export let isPrevNav = false
    export let scrollToPosition = null
    export let jumpToPosition = null
    export let pgId

    async function onScroll(e) {
        prevScrollPosPx = scrollPosPx
        scrollPosPx = e.target.scrollTop

        if (!animatingScroll) {
            progress.set(scrollPosPx, { duration: 0 })
        }

        let action = null
        
        if (prevScrollPosPx !== scrollPosPx) {
            dispatch('scroll', scrollData)
            if (scrollPosPx === endScrollPosPx) {
              loading = true
                action = 'next'

            }
            if (scrollPosPx === startScrollPosPx) {
                action = 'prev'
            }
            if (scrollPosPx === homeScrollPos) {
                action = 'home'
            }

            if (animatingScroll && scrollPosPx === targetScollPx) {
                dispatch(action, scrollData)
                return
            }

            if (!animatingScroll && action) {
                dispatch(action, scrollData)

            }
        }
    }

    function onWheel(e) {
        if (animatingScroll) {
            e.preventDefault()
        }
    }

    export let progress = tweened(0, {
        duration,
        easing,
    })

    export async function jumpToPos(destPos){
      return await scrollToPos(destPos, false)
    }

    export async function scrollToPos(destPos = 'home', anim = true) {
        if (!destPos) {
            return
        }
        targetPos = destPos
        switch (destPos) {
            case 'offscreen':
                targetScollPx = endScrollPosPx + 100
                break
            case 'start':
                targetScollPx = startScrollPosPx
                break
            case 'end':
                targetScollPx = endScrollPosPx
                break
            case 'beforeStart':
                targetScollPx = startScrollPosPx + 1
                break
            case 'beforeEnd':
                targetScollPx = endScrollPosPx - 1
                break
            default:
                targetScollPx = homeScrollPos
                break
        }
        if (anim) {
            animatingScroll = true
            await progress.set(targetScollPx)
            animatingScroll = false
        } else {
            await progress.set(targetScollPx, { duration: 0 })
        }
    }

    async function initPos(p) {
        setTimeout(async()=>{
          if (isPrevNav) {
              await scrollToPos('beforeEnd', false)
          } else {
              await scrollToPos('beforeStart', false)
          }
          animatingScroll = true
          loading = false
          await scrollToPos('home')
        }, 200)
        
    }

    $: if (animatingScroll) container.scrollTop = $progress
    $: endScrollPosPx = containerHeight + contentHeight + endPos + startPos
    $: homeScrollPos = containerHeight - homePos + startPos
    $: scrollDir = scrollPosPx - prevScrollPosPx
    $: scrollToPos(scrollToPosition)
    $: jumpToPos(jumpToPosition)
    $: initPos(pgId)
    $: {
        scrollData = {
            contentHeight,
            containerHeight,
            scrollPosPx,
            endScrollPosPx,
            startScrollPosPx,
            homeScrollPos,
            scrollDir,
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

</style>

<div
    class="container"
    bind:this={container}
    bind:clientHeight={containerHeight}
    on:scroll={onScroll}
    on:wheel={onWheel}
    style="opacity: {loading ? 0 : 1}"
    >
    {#if !loading}
    <div
        class="fg"
        bind:clientHeight={contentHeight}
        style="margin-top: {containerHeight + startPos}px; margin-bottom: {containerHeight + endPos}px">
        <slot name="fg" />
    </div>
    {/if}
</div>


