<script>
    export let chapter_number
    export let text_title
    export let text_subheading
    export let text_intro
    export let text_bodycopy
    export let image
    export let video
    export let bg_opacity
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

    .media-image img,
    .media-video .video {
        max-width: 100%;
    }
</style>

<div>

    <div class="title-row">
        {#if text_title}
            <h1>{text_title}</h1>
        {/if}

        {#if text_subheading}
            <h2>{text_subheading}</h2>
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
