<script>
    export let pageData
    export let scrollData
    export let isActive
    const { chapter_number, text_title, text_intro } = pageData
</script>

<style>
    .content {
        padding: 0 120px;
    }
    .chapter-number {
        font-size: 24px;
        color: #ffa52a;
    }

    .text-intro {
        max-width: 60%;
        font-size: 16pt;
        font-weight: 300;
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