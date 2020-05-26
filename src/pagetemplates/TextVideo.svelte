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

<style>
    .content-row {
        display: flex;
        flex-direction: row;
        padding: 1em;
    }

    .text-column {
        flex-grow: 1;
    }

    .media-column {
        flex-grow: 1;
    }

    .media-image img {
        max-width: 100%;
    }

</style>

<div>

    <div class="title-row">
        {#if text_title}
            <h1>{text_title}</h1>
        {/if}

        {#if text_subheading}
            <h2 class="subheading">{text_subheading}</h2>
        {/if}
    </div>

    <div class="content-row">
        <div class="text-column">

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

        <div class="media-column">
            {#if image}
                <div class="media-image">
                    <img src={image} alt={text_title} />
                </div>
            {/if}

            {#if video}
                <div class="media-video">
                    <video
                        src={video}
                        controls={true}
                        loop={false}
                        autoplay={false}
                        muted={true} />
                </div>
            {/if}
        </div>
    </div>

</div>
