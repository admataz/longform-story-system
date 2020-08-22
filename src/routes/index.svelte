<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`pages.json`)
            .then(r => r.json())
            .then(pages => {
                return { pages }
            })
    }
</script>

<script>
    export let pages
</script>

<style>
    #container {
        margin: 80px;
    }
    h3{
      margin: 10px 0;
    }

    a{
      text-decoration: none;
      color: #ccc;
    }

    a:hover{
      color: #fc3
    }

    .pages{
      border: 1px solid #fff;
      padding: 20px;
      margin: 20px;
    }
</style>

<svelte:head />

<div id="container">
    <h1>Longform story playground</h1>

    <p>This is a demo, test, playground</p>

    <p>
        <a href={pages[0].slug} rel="prefetch">start here</a>
    </p>

    <p>or jump to a page:</p>

<div class="pages">
    {#each pages as page}
        {#if page.template === 'chapter-title'}
            <h3>
                <a href={page.slug}>{page.text_title}</a>
            </h3>
        {:else}
            <div>
                <a href={page.slug}>{page.text_title}</a>
            </div>
        {/if}
    {/each}
</div>
</div>
