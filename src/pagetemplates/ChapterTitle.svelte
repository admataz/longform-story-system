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

  $: bgOpacity = scrollData ? scrollData.scrollPos/scrollData.endScrollPos : bg_opacity
</script>

<Scrollmation
	bind:this={scrollInstance}
  startPos="{-400}"
	endPos="{0}"
	duration={900}
  easing={easing}
  isPrevNav={isPrevNav}
	bind:scrollData="{scrollData}"
	bind:scrollToPos="{scrollToPos}"
	on:next={onNext}
	on:prev={onPrev}
	on:home={onHome}
>
  <div class="contentpanel" slot="fg" >
      {#if chapter_number}
        <div class="chapter-number">{chapter_number}</div>
      {/if}
  
      {#if text_title}
        <h1>{text_title}</h1>
      {/if}
  
      {#if text_intro}
      <div class="text-intro">
        {@html text_intro}
      </div>
      {/if}
    </div>

    <div slot="bg" >
    <BgMedia {image} {video} bg_opacity={1-bgOpacity} />
  </div>

</Scrollmation>




<style>
  .contentpanel {
    padding:0 120px;
  }
  .chapter-number {
    font-size: 12pt;
    color: #ffa52a;
  }

  .text-intro {
    max-width: 60%;
    font-size: 16pt;
    font-weight: 600;
  }
  h1 {
    margin-top: 0;
    font-size: 46pt;
  }
  h1:after {
    content: "";
    border-bottom: 4px solid #ffa52a;
    display: block;
    width: 50%;
  }
</style>