<script>

    import BgMedia from "./BgMedia.svelte"
    import Scrollmation from '../components/scrollmation.svelte'
    import { cubicOut as easing } from 'svelte/easing'
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
    export let onNext = ()=>{}
    export let onPrev= ()=>{}
    export let onHome = ()=>{}
    
    export let isPrevNav = false

    function onScroll(evt){
      scrollData = evt.detail
    }
  
    $: maskHeight = scrollData ? Math.abs(1-scrollData.scrollPos/scrollData.homeScrollPos)*50 : 100
    $: videoPaused = (maskHeight > 10) || !isActive
    

  </script>
   <div class="mask" style="top:-1px;  height: {maskHeight}%"></div>
   <div class="mask" style="bottom:-1px; height:{maskHeight}%"></div>
  <Scrollmation
    bind:this={scrollInstance}
    startPos={10}
    endPos={10}
    homePos={0}
    duration={1000}
    easing={easing}
    isPrevNav={isPrevNav}
    {scrollToPosition}
    on:next={onNext}
    on:prev={onPrev}
    on:home={onHome}
    on:scroll={onScroll}
  >
  

  
<div slot="fg" class="fg full-screen ">
   
</div>

<div slot="bg"  class="full-screen media-video" >
<video autoplay={isActive} bind:paused="{videoPaused}" controls >
  <source src={video} />
</video>
</div>
</Scrollmation>
<style>
  
  .mask{
    background: rgba(0,0,0,0.8);
    border-bottom: 0px solid white;
    border-top: 0px solid white;
    height: 50%;
    width: 100%;
    position: absolute;
  }

  .full-screen {
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content:center;
  }

  video {
    height: 100%;
  }

</style>