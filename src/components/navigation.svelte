<script>
    import { slide } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'

    export let pgData, segment
    const chapterTitles = pgData
        .filter(p => p.template === 'chapter-title')
        .map((p, i, a) => ({
            ...p,
            children: a[i + 1] ? a[i + 1].index - p.index : a.length - p.index,
        }))

    let preview = null
    let previewTop = -1000
    let previewRight = -1000

    const dispatch = createEventDispatcher()

    function showPreview(evt, pg) {
        preview = pg
        previewTop = evt.clientY - evt.clientY / 8
        previewRight = 100
    }

    function onClickItem(slug) {
        dispatch('clickNav', slug)
    }

    function calcChapterProgress(chapterIndex, childCount, currChildIndex) {
        if (currChildIndex > chapterIndex + childCount) {
            return 100
        }
        if (currChildIndex <= chapterIndex) {
            return 0
        }

        const currChapterPage = currChildIndex - chapterIndex

        return Math.ceil((currChapterPage / childCount) * 100)
    }

    $: currIndex = pgData.map(p => p.slug).indexOf(segment)
    $: currentPageIndex = pgData.findIndex(p => p.slug === segment)
    // $: console.log({ currentPageIndex })
</script>

<style>
    .navigation {
        position: absolute;
        right: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100px;
        padding: 80px 40px;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .nav-item {
        width: 100%;
        flex-grow: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .nav-item a {
        display: block;
    }

    .nav-circle {
        background-color: #fff;
        border-radius: 100%;
        height: 24px;
        width: 24px;
        display: block;
        flex-shrink: 1;
    }
    .nav-circle span{
      display:none;
    }

    .nav-line {
        display: block;
        flex-grow: 1;
        width: 4px;
        padding: 0;
        margin: 10px 0;
        background-color: #fff;
    }

    .nav-circle.activated,
    .nav-line-progress {
        background-color: #ffa52a;
    }

    .nav-item:first-child {
        justify-content: flex-end;
    }

    .nav-item:first-child,
    .nav-item:nth-last-child(2) {
        flex-grow: 5;
    }

    .nav-item:last-child .nav-line {
        display: none;
    }

    .nav-popup-preview {
        position: absolute;
        z-index: 31;
        width: 300px;
        background-color: #fff;
        color: #666;
        padding: 20px;
        border-left: 8px solid #ffa52a;
        font-size: 14px;
    }

    .preview-chapter-number {
        font-weight: 800;
        font-size: 14px;
    }
    .preview-text-intro {
        margin-top: 20px;
    }
</style>

{#if preview}
    <div
        class="nav-popup-preview"
        style="top:{previewTop}px; right:{previewRight}px"
        transition:slide>
        {#if preview.chapter_number}
            <div class="preview-chapter-number">{preview.chapter_number}</div>
        {/if}

        {#if preview.text_title}
            <div class="preview-chapter-title">{preview.text_title}</div>
        {/if}

        {#if preview.text_intro}
            <div class="preview-text-intro">
                {@html preview.text_intro}
            </div>
        {/if}
    </div>
{/if}

<div class="navigation">

    {#each chapterTitles as pg}
        <div class="nav-item">

            <a
                class="nav-circle {pg.index <= currIndex && 'activated'}"
                href="/{pg.slug}"
                on:click|preventDefault="{() => {
                    onClickItem(pg.slug)
                }}"
                on:mouseover="{evt => {
                    showPreview(evt, pg)
                }}"
                on:mouseout="{evt => {
                    preview = null
                }}" >
                  <span>{pg.text_title}</span>
                </a>
            <div class="nav-line">
                <div
                    class="nav-line-progress"
                    style="height: {calcChapterProgress(pg.index, pg.children, currentPageIndex)}%" />
            </div>
        </div>
    {/each}
</div>
