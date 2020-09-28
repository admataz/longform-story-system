<script>
    import Scrollmation from 'svelte-scrollmation/scrollmation.svelte'
    import marked from 'marked'

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
    .text-intro {
        max-width: 60%;
    }

    .content {
        max-width: 50%;
        font-size: 18px;
        margin: 80px;
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
        <p>{slug}</p>
        {#if chapter_number}
            <p>{chapter_number}</p>
        {/if}

        {#if text_title}
            <h1>{text_title}</h1>
        {/if}

        {#if text_subheading}
            <h2 class="subheading">{text_subheading}</h2>
        {/if}

        {#if text_intro}
            <div class="text-intro">
                {@html text_intro}
            </div>
        {/if}

        {#if text_bodycopy}
            <div class="text-bodycopy">
                {@html text_bodycopy}
            </div>
        {/if}
    </div>

</Scrollmation>
