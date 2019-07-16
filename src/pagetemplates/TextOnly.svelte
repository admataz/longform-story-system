<script>
    export let pageData
    export let scrollData
    export let isActive
    const {
        chapter_number,
        text_title,
        text_subheading,
        text_intro,
        text_bodycopy,
        image,
        video,
        bg_opacity,
    } = pageData
</script>


<div class="content">
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
