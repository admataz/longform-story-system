<script>
    import marked from 'marked'

    import Scrollmation from 'svelte-scrollmation/scrollmation.svelte'

    export let pageData
    export let isprevnav = false
    let scrollComponent

    export async function next() {
        isprevnav = false
        await scrollComponent.scrollToPos('end')
    }
    export async function prev() {
        isprevnav = true
        await scrollComponent.scrollToPos('start')
    }

    export async function toBeforeEnd() {
        isprevnav = false
        await scrollComponent.scrollToPos('beforeEnd')
    }

    export async function toBeforeStart() {
        isprevnav = true
        await scrollComponent.scrollToPos('beforeStart')
    }

    $: slug = pageData.slug
    $: template = pageData.template
    $: chapter_number = pageData.chapter_number
    $: text_title = pageData.text_title
    $: text_subheading = pageData.text_subheading
    $: text_bodycopy = marked(pageData.text_bodycopy)
    $: text_intro = marked(pageData.text_intro)
    $: text_navintro = pageData.text_navintro
    $: image = pageData.image
    $: video = pageData.video
    $: bg_opacity = pageData.bg_opacity
</script>

<style>
    .content {
        padding: 0 80px;
    }

    .text-intro {
        max-width: 60%;
        font-size: 16pt;
        font-weight: 300;
    }
</style>

<Scrollmation
    homepos={150}
    endpos={400}
    startpos={200}
    pgId={slug}
    on:next
    on:prev
    on:home
    bind:this={scrollComponent}
    {isprevnav}>

    <div class="content">
        {#if chapter_number}
            <div class="chapter-number">{chapter_number}</div>
        {/if}

        {#if text_title}
            <h1>{text_title}</h1>
        {/if}

        {#if text_intro}
            <div class="text-intro">
                {@html text_intro}
            </div>
        {/if}
    </div>

</Scrollmation>
