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
    $: [text_before_video, text_after_video] = text_bodycopy.split('{video}')

</script>

<style>
    .text-intro {
        max-width: 60%;
    }

    .content {
        margin: 200px 0 0 0;
        padding-left: 80px;
        margin-bottom: 0;
        height: 100%;
        overflow: auto;
        max-width: 40%;
    }

    /* .media-image, */
    .media-video {
        max-width: 100%;
        max-height: 100%;
    }

    /* .media-image img, */
    .media-video video {
        width: 100%;
        height: 100%;
    }
</style>

<div>
    <div class="content fg">
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

        {#if text_before_video}
            <div class="text-bodycopy">
                {@html text_before_video}
            </div>
        {/if}

        {#if video}
            <div class="media-video">
                <video controls paused>
                    <source src={video} />
                    <track kind="captions" />
                </video>
            </div>
        {/if}

        {#if text_after_video}
            <div class="text-bodycopy">
                {@html text_after_video}
            </div>
        {/if}
    </div>

</div>
