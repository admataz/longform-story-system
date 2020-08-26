<script>
    import { fade } from 'svelte/transition'
    export let pgData
    export let pgId
</script>

<style>
    .bgitems {
        width: 100%;
        height: 100%;
        position: absolute;
    }
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
    video {
        min-width: 100vw;
        min-height: 100vh;
        position: absolute;
        top: 0;
        outline: none;
    }
</style>

<div class="bgitems">
<!-- the recommended approach to forcing a transition: https://stackoverflow.com/a/61838756 -->
    {#each [pgData] as pg (pg)} 
        <div
            class="media-video"
            transition:fade={{ duration: 2000 }}
            style="opacity:{pg.bg_opacity}">
            <video
                preload="auto"
                controls={false}
                loop={true}
                autoplay={true}
                muted={true}>
                <source src={pg.bg_video} />
            </video>
        </div>
    {/each}

</div>
