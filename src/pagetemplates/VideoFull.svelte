<script>

    import BgMedia from "./BgMedia.svelte";
    import Scrollmation from '../components/scrollmation.svelte'
    import { cubicOut as easing } from 'svelte/easing';
    export let chapter_number;
    export let text_title;
    export let text_subheading;
    export let text_intro;
    export let text_bodycopy;
    export let image;
    export let video;
    export let bg_opacity;
  
    let scrollInstance, scrollData
    export let scrollToPos
    export let onNext = ()=>{}
    export let onPrev= ()=>{}
    export let onHome = ()=>{}
    
    export let isPrevNav = false
  
  
  </script>
  
  <Scrollmation
    bind:this={scrollInstance}
    startPos={-100}
    endPos={-500}
    homePos={0}
    duration={500}
    easing={easing}
    isPrevNav={isPrevNav}
    bind:scrollData={scrollData}
    bind:scrollToPos={scrollToPos}
    on:next={onNext}
    on:prev={onPrev}
    on:home={onHome}
  >
<div class="full-screen media-video" slot="fg">
    <video autoplay controls >
      <source src={video} />
    </video>
</div>
</Scrollmation>
<style>
  
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