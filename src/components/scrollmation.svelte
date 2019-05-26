<script>
  import {afterUpdate, createEventDispatcher, onMount} from 'svelte'
  import {tweened} from 'svelte/motion'
  import {cubicOut} from 'svelte/easing'
  const dispatch = createEventDispatcher()

  let contentHeight
  let containerHeight
  let container

  let scrollPosPx = 0
  let animatingScroll = false
  let endScrollPosPx
  let startScrollPosPx
  let prevScrollPosPx
  let targetScollPx
  let scrollDir


  export let startPos = 110 // px past the end
  export let homePos = 80 //px from the top
  export let endPos = 120 // px above the top
  export let duration = 800
  export let easing = cubicOut
  export let scrollData = {}
  export let isPrevNav = false
  export let scrollToPosition = null
  export let pgId

  function onScroll(e) {
    prevScrollPosPx= scrollPosPx
    scrollPosPx = e.target.scrollTop
    
    if (!animatingScroll) {
      progress.set(scrollPosPx, {duration: 0})
    }

    let action = null

    if ((prevScrollPosPx !== scrollPosPx)) {
      dispatch('scroll', scrollData)
      
      if (scrollPosPx === endScrollPosPx) {
        action = 'next'
      }
      if (scrollPosPx === startScrollPosPx) {
        action = 'prev'
      }
      if (scrollPosPx === homeScrollPos) {
        action = 'home'
      }

      if(animatingScroll && scrollPosPx === targetScollPx){
        dispatch(action, scrollData)
        return
      }

      if(!animatingScroll && action){
        dispatch(action, scrollData)
      }
    }
  }

  function onWheel(e){
    if(animatingScroll){
      e.preventDefault()
    }
  }

  export let progress = tweened(0, {
    duration,
    easing,
  })

  export async function scrollToPos(destPos = 'home', anim = true) {
    if (!destPos) {
      return
    }
    switch (destPos) {
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
      await progress.set(targetScollPx, {duration: 0})
    }
  }

  async function initPos(p){
    if(isPrevNav){
      await scrollToPos('beforeEnd', false)
    } else {
      await scrollToPos('beforeStart', false)
    }
    animatingScroll = true
    await scrollToPos('home')
  }

  $: if (animatingScroll) container.scrollTop = $progress
  $: endScrollPosPx = containerHeight + contentHeight + endPos + startPos
  $: startScrollPosPx = 0
  $: homeScrollPos = containerHeight - homePos + startPos
  $: scrollDir = scrollPosPx - prevScrollPosPx
  $: scrollToPos(scrollToPosition)
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
      toHomeRatio:
        (homeScrollPos - scrollPosPx) / (homeScrollPos - startScrollPosPx),
      toStartRatio:
        (scrollPosPx - startScrollPosPx) / (homeScrollPos - startScrollPosPx),
      toEndRatio: (scrollPosPx - endScrollPosPx) / (homeScrollPos - endScrollPosPx),
      toRangeRatio:
        (scrollPosPx - endScrollPosPx) / (startScrollPosPx - endScrollPosPx),
      fullRangePx: endScrollPosPx - startScrollPosPx,
      toHomePx: homeScrollPos - scrollPosPx,
      toEndPx: endScrollPosPx - scrollPosPx,
      toStartPx: startScrollPosPx - scrollPosPx,
    }
  }
</script>

<style>
  .container {
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }
  .bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>

<div
  class="container"
  bind:this="{container}"
  bind:clientHeight="{containerHeight}"
  on:scroll="{onScroll}"
  on:wheel="{onWheel}"
>
  <div
    class="fg"
    bind:clientHeight="{contentHeight}"
    style="
    margin-top: {containerHeight+startPos}px;
    margin-bottom: {containerHeight+endPos}px
    "
    >
    <slot name="fg"></slot>
  </div>
  <div class="bg">
    <slot name="bg"></slot>
  </div>
</div>
