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

    const [text_before_video, text_after_video] = text_bodycopy.split('{video}')

</script>

<style>
    .text-intro {
        max-width: 60%;
    }
    h1 {
        margin-top: 0;
        font-size: 46pt;
    }
    h1:after {
        content: '';
        border-bottom: 4px solid #ffa52a;
        display: block;
        width: 50%;
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

        {#if text_before_video}
            <div class="text-bodycopy">
                {@html text_before_video}
            </div>
        {/if}

        {#if video}
            <div class="media-video">
                <video controls paused>
                    <source src={video} />
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
