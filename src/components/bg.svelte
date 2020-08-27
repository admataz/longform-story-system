<script>
    import { fade } from 'svelte/transition'
    export let pgData
</script>

<style>
    .bgitems {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .bgitem {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: cover;
    }
</style>

<div class="bgitems">
<!-- the recommended approach to forcing a transition: https://stackoverflow.com/a/61838756 -->
    {#each [pgData] as pg (pg)}
        <div
            transition:fade={{ duration: 2000 }}
            class="bgitem"
            style="background-image: url({pg.bg}); opacity: {pg.bg_opacity};" />
    {/each}
</div>
