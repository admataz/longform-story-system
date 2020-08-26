<script>
    import { fade } from 'svelte/transition'
    import {
        createEventDispatcher,
        beforeUpdate,
        afterUpdate,
        onMount,
    } from 'svelte'
    export let pageData

    const dispatch = createEventDispatcher()

    let scrollPos = 0
    let containerHeight
    let delayScrollTimer = true
    let navDispatched = false

    function onWheel(evt) {
        if (delayScrollTimer) {
            return
        }
        scrollPos += evt.deltaY / 4
        if (scrollPos > containerHeight) {
            if (!navDispatched) {
                dispatch('next')
                navDispatched = true
            }
        }
        if (scrollPos < -containerHeight) {
            if (!navDispatched) {
                dispatch('prev')
                navDispatched = true
            }
        }
    }

    onMount(() => {
        setTimeout(() => {
            delayScrollTimer = false
        }, 800)
    })

    export async function next() {
        dispatch('next')
    }
    export async function prev() {
        dispatch('prev')
    }

    export async function toBeforeEnd() {
    }

    export async function toBeforeStart() {
    }

    $: maskHeight = scrollPos
    $: navDispatched = !pageData.slug
</script>

<style>
    .fullscreen {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .media-video {
        /* opacity: 0.5; */
        display: flex;
        align-content: stretch;
        height: 100%;
        background-color: #000;
        min-width: 100%;
        min-height: 100%;
        width: 100vw;
        height: 100vh;
    }
    video {
        max-width: calc(100% - 80px);
        max-height: 100%;
        min-height: auto;
        min-width: auto;
        position: relative;
        width: 100%;
        outline: 0;
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 0;
        background: rgba(0, 0, 0, 0.95);
        /* border: 2px solid red; */
        z-index: 2;
    }
</style>

<div class="fullscreen" on:wheel={onWheel} bind:clientHeight={containerHeight}>
    <div class="mask" style="height:{maskHeight}px; top:0;" />
    <div class="mask" style="height: {-maskHeight}px; bottom:0;" />
    <div class="media-video" transition:fade={{ duration: 500 }}>
        <video
            preload="auto"
            controls="auto"
            loop={false}
            autoplay={true}
            muted={false}>
            <source src={pageData.video} />
        </video>
    </div>
</div>
