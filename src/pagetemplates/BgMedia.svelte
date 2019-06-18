<script>
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

</script>

<style>
    .media-image,
    .media-video {
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        opacity: 0.5;
        display: flex;
        align-content: stretch;
        overflow: hidden;
        height: 100%;
    }

    .media-image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    video {
        min-height: 100%;
        min-width: 100%;
    }
</style>

<div class="media">
    {#if pageData.image}
        <div
            class="media-image"
            style="opacity: {bg_opacity || 0.5};
            background-image:url({pageData.image})" />
    {:else if pageData.video && template!=='video-full'}
        <div class="media-video" style="opacity: {bg_opacity || 0.5};}">
            <video controls={false} loop autoplay src={pageData.video} muted />
        </div>
    {/if}
</div>
