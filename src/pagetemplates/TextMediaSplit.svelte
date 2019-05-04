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
    <div class="content fg" slot="fg">
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

    <div class="media bg">
    {#if image}
    <div class="media-image">
      <img src={image} alt={text_title} />
    </div>
    {:else if video}
    <div class="media-video">
        <video  controls="false" loop autoplay >
            <source src={video} />
          </video>
    </div>
    {/if}
    </div>
  </Scrollmation>

  <style>
  .text-intro {
    max-width: 60%;
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

  .content {
    margin: 200px 2%;
    height: 100%;
    overflow: auto;
    max-width: 40%;
  }
  .bg {
    top: 0;
    position: fixed;
    width: 55%;
    left: 45%;
    max-width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: 100%;

    padding: 0 20px;
  }

  .media-image,
  .media-video {
    max-width: 100%;
    max-height: 100%;
    margin: 10px;
  }

  .media-image img,
  .media-video video {
    width: 100%;
    height: 100%;
  }
</style>

