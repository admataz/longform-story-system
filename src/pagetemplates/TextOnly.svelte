<script>
  export let pageData
  $: slug = pageData.slug
  $: template = pageData.template
  $: chapter_number = pageData.chapter_number
  $: text_title = pageData.text_title
  $: text_intro = pageData.text_intro
  $: text_subheading = pageData.text_subheading
  $: text_bodycopy = pageData.text_bodycopy
  $: text_navintro = pageData.text_navintro
  $: image = pageData.image
  $: video = pageData.video
  $: bg_opacity = pageData.bg_opacity

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
