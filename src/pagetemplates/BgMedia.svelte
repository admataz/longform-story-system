<script>
    import { fade } from 'svelte/transition'

    export let pageData
    export let bgOpacity = 1
    export let isActive
    const {
        chapter_number,
        text_title,
        text_subheading,
        text_intro,
        text_bodycopy,
        image,
        video,
        bg_opacity,
        template
    } = pageData

    const isFullVideo = (template==='video-full')
</script>

<style>
    .media-image,
    .media-video {
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        width: 100vw;
        height: 100vh;
        /* opacity: 0.5; */
        display: flex;
        align-content: stretch;
        overflow: hidden;
        height: 100%;
        background-color: #000;
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
    }

</style>


<div class="media" style="opacity: {isFullVideo ? 1 :  bg_opacity || 0.5}">
    {#if pageData.image}
        <div class="media-image"  style="background-image:url({pageData.image})" />
    {:else if pageData.video}
        <div class="media-video">
            <video controls={isFullVideo} loop={!isFullVideo} autoplay  muted={!isFullVideo} class="{isFullVideo? 'fullVideo': 'bgVideo'}">
              <source src={pageData.video} />
            </video>
        </div>
    {/if}
</div>
