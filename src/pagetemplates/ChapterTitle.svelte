<script>
  import marked from 'marked'

  export let pageData
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
