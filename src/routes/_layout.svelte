<script context="module">
    export async function preload({params, path, query}) {
        const res = await this.fetch(`pages.json`)
        const jsonData = await res.json()
        const pgData = jsonData.map((p,i) => ({...p, index:i }))
        const pages = pgData.reduce((acc, page, index, arr) => {
            const p = {
                ...page,
                _nav: {
                    prev: index ? arr[index - 1].slug : null,
                    next: index + 1 < arr.length ? arr[index + 1].slug : null,
                },
            }
            acc[page.slug] = p
            return acc
        }, {})

        return {
            pages,
            pgData
        }
    }
</script>


<script>
  import { setContext } from 'svelte';
  // import Nav from '../components/navigation.svelte'

  export let pages, pgData
  export let segment

  setContext('pages', pages)
</script>


<!-- <Nav pgData={pgData} {segment} /> -->
<main>
    <slot />
</main>
