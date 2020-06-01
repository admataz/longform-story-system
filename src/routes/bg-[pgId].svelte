<script context="module">
    export async function preload({ params, path, query }) {
        return {
            pgId: params.pgId,
        }
    }
</script>

<script>
    import { getContext } from 'svelte'
    import { fade } from 'svelte/transition'
    export let pgId
    const pages = getContext('pages')
    const pgData = getContext('pgData')

    $: console.log(pages)
    $: console.log(pgData)
</script>

<div>
    {#each pgData as pg}
        {#if pg.slug === pgId}
            <img src={pg.bg} transition:fade alt={pg.title} />
        {/if}
    {/each}
</div>


