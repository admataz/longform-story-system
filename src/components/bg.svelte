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
    .bgitem {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: cover;
    }
</style>

<div class="bgitems">
    {#each pgData as pg}
        {#if pg.slug === pgId && pg.bg}
            <div
                transition:fade={{ duration: 2000 }}
                class="bgitem"
                style="background-image: url({pg.bg}); opacity: {pg.bg_opacity};" />
        {/if}
    {/each}
</div>
