<script>
    import { slide } from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'

    export let pgData, segment
    const chapterTitles = pgData.filter(p => p.template === 'chapter-title')
    let preview = null
    let previewTop = -1000
    let previewRight = -1000
    
    const dispatch = createEventDispatcher()


    function showPreview(evt, pg) {
        preview = pg
        previewTop = evt.clientY - evt.clientY / 8
        previewRight = 100
    }

    function onClickItem(slug){
      dispatch('clickNav', slug)
    }

    $: currIndex = pgData.map(p => p.slug).indexOf(segment)
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
        fill: #fff;
        height: 24px;
        width: 24px;
        display: block;
        flex-shrink: 1;
    }
    .nav-line {
        display: block;
        flex-grow: 1;
        stroke-width: 4px;
        padding: 0;
        height: 60%;
        stroke: #fff;
    }

    .nav-item.activated .nav-line {
        stroke: #ffa52a;
    }

    .nav-item.activated .nav-circle {
        fill: #ffa52a;
    }

    .nav-item:first-child {
        flex-shrink: 1;
        flex-grow: 1;
    }

    .nav-item:last-child {
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .nav-item:first-child .nav-line {
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
        <div class="nav-item {pg.index <= currIndex && 'activated'}">
            <!-- <svg class="nav-line" viewBox="0 0 100 100">
                <line x1="50%" y1="0" x2="50%" y2="100%" />
            </svg> -->

            <a
                href="/{pg.slug}"
                on:click|preventDefault="{()=>{
                  onClickItem(pg.slug)
                }
                }"
                on:mouseover="{evt => {
                    showPreview(evt, pg)
                }}"
                on:mouseout="{evt => {
                    preview = null
                }}">
                [0]
                <!-- <svg class="nav-circle" viewBox="0 0 100 100">
                    <circle cx="50%" cy="50%" r="50" />
                </svg> -->

            </a>

        </div>
    {/each}
</div>
