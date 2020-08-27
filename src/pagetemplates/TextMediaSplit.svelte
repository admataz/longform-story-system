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
    .bg {
        top: 0;
        position: fixed;
        width: 55%;
        left: 45%;
        max-width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        height: 100%;

        padding: 0 20px;
    }

    .media-image,
    .media-video {
        max-width: 100%;
        max-height: 100%;
        margin: 10px;
    }

    .media-image img,
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

        {#if text_bodycopy}
            <div class="text-bodycopy">
                {@html text_bodycopy}
            </div>
        {/if}
    </div>

    <div class="media bg">
        {#if image}
            <div class="media-image">
                <img src={image} alt={text_title} />
            </div>
        {:else if video}
            <div class="media-video">
                <video controls="false" loop autoplay>
                    <source src={video} />
                    <track kind="captions" />
                </video>
            </div>
        {/if}
    </div>
</div>
