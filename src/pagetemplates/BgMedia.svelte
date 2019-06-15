<script>
    export let image
    export let video
    export let bg_opacity

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
    {#if image}
        <div
            class="media-image"
            style="opacity: {bg_opacity ? bg_opacity : 0.5};
            background-image:url({image})" />
    {:else if video}
        <div class="media-video" style="opacity: {bg_opacity};}">
            <video controls={false} loop autoplay src={video} muted />
        </div>
    {/if}
</div>
