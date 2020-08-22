<script context="module">
    export async function preload({ params, path, query }) {
        const res = await this.fetch(`pages.json`)
        const jsonData = await res.json()
        const pgData = jsonData.map((p, i) => ({ ...p, index: i }))
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
            pgData,
        }
    }
</script>

<script>
    import { setContext } from 'svelte'
    import Nav from '../components/navigation.svelte'
    import { clickNavTo } from '../store/'

    export let pages, pgData
    export let segment
    function onClickNav(evt) {
        $clickNavTo = evt.detail
    }
    setContext('pages', pages)
    setContext('pgData', pgData)
</script>

<style>
    main {
        display: flex;
    }
</style>

<main>
    <slot>some fallback content</slot>
    <Nav {pgData} {segment} on:clickNav={onClickNav} />
</main>
