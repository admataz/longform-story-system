<script>
  import {onMount} from 'svelte'
  import {tweened} from 'svelte/motion'
  import {cubicOut} from 'svelte/easing'
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  let contentHeight
  let containerHeight
  let container

  let scrollPos = 0
  let animatingScroll = false
  let endScrollPos
  let startScrollPos
  let prevScrollPos
  let scrollDir

  function onScroll(e) {
    prevScrollPos = scrollPos
    scrollPos = e.target.scrollTop
    if (!animatingScroll) {
      progress.set(scrollPos, {duration:0})
    }
    if (prevScrollPos !== scrollPos) {
      if (scrollPos === endScrollPos) {
        dispatch('next', scrollData)
      }
      if (scrollPos === startScrollPos) {
        dispatch('prev', scrollData)
      }
      if (scrollPos === homeScrollPos) {
        dispatch('home', scrollData)
      }
    }
  }

  export let startPos = 110 // px past the end
  export let homePos = 80 //px from the top
  export let endPos = 120 // px above the top
  export let duration = 800
  export let easing = cubicOut
  export let scrollData = {}
  export let isPrevNav = false

  export let progress = tweened(0, {
    duration,
    easing,
  })


  export async function scrollToPos(destPos = 'home', anim = true) {
    let destPx=0
    switch (destPos) {
      case 'start':
        destPx = startScrollPos
        break
      case 'end':
        destPx = endScrollPos
        break
      case 'beforeStart':
        destPx = startScrollPos +1
        break
      case 'beforeEnd':
        destPx = endScrollPos - 1
        break
      default:
        destPx = homeScrollPos
        break
    }

    if(anim){
      animatingScroll = true
      await progress.set(destPx)
      animatingScroll = false
    } else {
      await progress.set(destPx, {duration:0})
    }
  }

  $: if (animatingScroll) container.scrollTop = $progress
  $: endScrollPos = containerHeight + contentHeight + endPos + startPos
  $: startScrollPos = 0
  $: homeScrollPos = containerHeight - homePos + startPos
  $: scrollDir - scrollPos - prevScrollPos
  // $: console.log($progress)

  $: {
    scrollData = {
      contentHeight,
      containerHeight,
      scrollPos,
      endScrollPos,
      startScrollPos,
      homeScrollPos,
      scrollDir
    }
  }

  onMount(() => {
    if(isPrevNav){
      setTimeout(()=>scrollToPos('beforeEnd', false))
    }
    setTimeout(()=>scrollToPos('home'))
  })
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