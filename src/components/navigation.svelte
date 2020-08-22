<script>
    import { fade } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'

    import FbIcon from '../gfx/icons/fb.svelte'
    import TwitterIcon from '../gfx/icons/twitter.svelte'
    import DocIcon from '../gfx/icons/document.svelte'
    // import ShareIcon from '../gfx/icons/share.svelte'
    // import EmailIcon from '../gfx/icons/email.svelte'

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

    let shareTop = -1000
    let shareRight = -1000

    let showSharePanel = false

    const dispatch = createEventDispatcher()

    function showPreview(evt, pg) {
        preview = pg
        previewTop = evt.currentTarget.offsetTop - 25
        previewRight = 50
    }

    function toggleSharePanel(evt, pg) {
        showSharePanel = !showSharePanel

        if (showSharePanel) {
            shareTop = evt.currentTarget.offsetTop - 25
            shareRight = 48
        }
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
</script>

<style>
    .nav-container {
        position: absolute;
        right: 0;
        z-index: 200;
        width: 80px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        font-size: 14px;
        color: #fff;
        flex-basis: 100%;
        padding: 20px 0;
    }

    .nav-heading {
        flex-grow: 1;
        flex-direction: column;
        display: flex;
        justify-content: flex-end;
    }

    .navigation {
        margin: 20px 0 50px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 100;
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
        border-radius: 100%;
        border: 2px solid #fff;
        height: 14px;
        width: 14px;
        display: block;
        flex-shrink: 1;
    }
    .nav-circle span {
        display: none;
    }

    .nav-line {
        display: block;
        flex-grow: 1;
        width: 2px;
        padding: 0;
        margin: 10px 0;
        background-color: #fff;
    }

    .nav-circle.activated,
    .nav-line-progress {
        background-color: #c30;
    }

    .nav-circle.current{
        background-color: #c30;
        border-color: #c30;
    }

    .nav-item:first-child {
        justify-content: flex-end;
    }

    .nav-item:first-child,
    .nav-item:nth-last-child(2) {
        flex-grow: 5;
    }

    .nav-item:last-child {
        flex-grow: 1;
        justify-content: flex-start;
    }
    .nav-item:first-child .nav-line {
        margin-top: 0;
    }
    .nav-item:nth-last-child(2) .nav-line {
        margin-bottom: 0;
    }
    .nav-item:last-child .nav-line {
        display: none;
        margin: 0;
    }
    .nav-popup-wrapper {
        display: flex;
        flex-direction: row;
        position: absolute;
        z-index: 1000;
    }
    .nav-popup-preview {
        width: 300px;
        background-color: rgba(255, 255, 255, 0.3);
        color: #000;
        padding: 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index:1000;
    }
    .arrow-right {
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 12px solid rgba(255, 255, 255, 0.3);
        margin-top: 20px;
    }

    .preview-chapter-number {
        font-weight: 800;
        font-size: 14px;
    }
    .preview-text-intro {
        margin-top: 20px;
    }

    .menu-heading {
        width: 100%;
    }

    .share {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
        min-height: 100px;
    }

    .share-popup-wrapper {
        display: flex;
        flex-direction: row;
        position: absolute;
        z-index: 1000;
    }
    .share-popup {
        width: 200px;
        background-color: rgba(79, 76, 75, 0.8);
        color: #fff;
        padding: 20px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
</style>

{#if preview}
    <div
        class="nav-popup-wrapper"
        style="top:{previewTop}px; right:{previewRight}px"
        transition:fade>
        <div class="nav-popup-preview">
            {#if preview.chapter_number}
                <div class="preview-chapter-number">
                    {preview.chapter_number}
                </div>
            {/if}

            {#if preview.text_title}
                <div class="preview-chapter-title">{preview.text_title}</div>
            {/if}

            {#if preview.text_navintro}
                <div class="preview-text-intro">
                    {@html preview.text_navintro}
                </div>
            {/if}
        </div>
        <div class="arrow-right" />
    </div>
{/if}

{#if showSharePanel}
    <div
        class="share-popup-wrapper"
        style="top:{shareTop}px; right:{shareRight}px"
        transition:fade>
        <div class="share-popup">
            <FbIcon />
            <TwitterIcon />
            <EmailIcon />
        </div>
        <div
            class="arrow-right"
            style="border-left-color: rgba(79, 76, 75, .8)" />
    </div>
{/if}

<div class="nav-container">
    <div class="navigation">

        {#each chapterTitles as pg}
            <div class="nav-item">

                <a
                    class="nav-circle {pg.index <= currIndex && 'activated'}  {pg.index === currIndex && 'current'}"
                    href="/{pg.slug}"
                    on:click|preventDefault={() => {
                        onClickItem(pg.slug)
                    }}
                    on:mouseover={evt => {
                        showPreview(evt, pg)
                    }}
                    on:mouseout={evt => {
                        preview = null
                    }}>
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
    <div class="share">

    </div>
</div>
