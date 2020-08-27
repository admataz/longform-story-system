<script>
    import {  createEventDispatcher, beforeUpdate, afterUpdate } from 'svelte'
    import marked from 'marked'

    export let pageData
    // export let bgOpacity = 1
    export let isActive
    export let videoPaused=true
    export let  videoCurrentTime=0
    export let  videoDuration=0
    
    // export let isVideoFinished=false

    const dispatch = createEventDispatcher()
    const isFullVideo = (pageData.template==='video-full' )
    const isInlineVideo = (pageData.template ==='video-inline')
    
    $: videoPaused = !isActive
    // $: videoDuration && console.log(videoDuration-videoCurrentTime)
    // $: console.log(isVideoFinished)
    // $: console.log(isActive && isFullVideo && videoCurrentTime)
    // $: (videoDuration ===videoCurrentTime ) && isActive && isFullVideo && dispatch('next')

    $: slug = pageData.slug
    $: chapter_number = pageData.chapter_number
    $: text_title = pageData.text_title
    $: text_subheading = pageData.text_subheading
    $: text_bodycopy = marked(pageData.text_bodycopy)
    $: text_intro = marked(pageData.text_intro)
    $: image = pageData.image
    $: video = pageData.video
    $: bg_opacity = pageData.bg_opacity

    function onWheel(evt){
      if(!isActive || !isFullVideo){
        return
      }
      if(evt.wheelDeltaY > 20){
         dispatch('prev')
      }
      if(evt.wheelDeltaY < -20){
         dispatch('next')
      }
    }
</script>

<style>
    .container{
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    .media-image,
    .media-video {
        /* opacity: 0.5; */
        display: flex;
        align-content: stretch;
        height: 100%;
        background-color: #000;
        min-width: 100%;
        min-height: 100%;
        width: 100vw;
        height: 100vh;
    }

    .media-image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    video {
        min-width: 100vw;
        min-height: 100vh;
        position: absolute;
        top:0;
        outline: none;
    }
  
  .active{opacity: 1}
  .inactive{opacity: 0}
  
  .fullVideo.active{
    z-index: 2
  }

  .fullVideo .media-video {
    position: relative;
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
  }

  .fullVideo video{
     max-width: calc(100% - 80px);
     max-height: 100%;
     min-height: auto;
     min-width: auto;
     position: relative;
     width: 100%;
  }

</style>
<div class="container {isActive?'active':'inactive'} {isFullVideo? 'fullVideo': 'bgVideo'}" >
<div class="media" style="opacity: {isFullVideo ? 1 :  bg_opacity || 0.5}">
    {#if image}
        <div class="media-image"  style="background-image:url({image})" />
    {:else if pageData.video && !isInlineVideo}
        <div class="media-video" on:wheel={onWheel} >
            <video 
              preload="auto"
              controls={isFullVideo} 
              loop={!isFullVideo} 
              autoplay={isActive}
              bind:paused={videoPaused}
              bind:currentTime={videoCurrentTime}
              bind:duration={videoDuration}
              muted={!isFullVideo} 
              >
              <source src={video} />
            </video>
        </div>
    {/if}
</div>
</div>

