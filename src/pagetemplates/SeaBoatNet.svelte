<script>
    import { onMount, createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

    import Boat from './sea-boat-net/boat.svg.svelte'
    import Fishet from './sea-boat-net/fishnet.svg.svelte'
    import Wave from './sea-boat-net/wave.svg.svelte'
    import Hook from './sea-boat-net/hook.svg.svelte'

    export let pageData
    export let isprevnav = false

    const dispatch = createEventDispatcher()
    let isNavigating = false

    export async function next() {
        await dispatch('next')
    }
    export async function prev() {
        await dispatch('prev')
    }

    export async function toBeforeEnd() {}
    export async function toBeforeStart() {}

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const startpos = {
        boatplus: {
            x: 100,
            y: 23,
        },
        boat: {
            x: 0,
            y: 0,
            scale: 0.1,
        },
        fishnet: {
            x: 32.5,
            y: 13.8,
            scale: 0.1,
        },
        fishingline: {
            x1: 37,
            y1: 10,
            x2: 37,
            y2: 12,
        },
        hook: {
            x: 36.15,
            y: 10,
            scale: 0.1,
        },
    }

    onMount(() => {
        const tlDrop = () =>
            gsap
                .timeline()
                .to('#boatplus', {
                    y: -20,
                    duration: 40,
                }, 0)
                .to(
                    '#boat',
                    {
                        y: 2,
                        scale: 0.05,
                        duration: 40,
                        transformOrigin: '100% 0',
                    },
                    0
                )
                .to(
                    '#hook',
                    { y: 28.4, duration: 40, transformOrigin: '0 100%' },
                    0
                )
                .to(
                    '#fishingline',
                    {
                        y: -2.6,
                        scaleY: 12,
                        duration: 40,
                        transformOrigin: '0 0',
                    },
                    0
                )
                .to(
                    '#fishnet',
                    {
                        scale: 0.3,
                        y: 30,
                        duration: 40,
                        transformOrigin: '50% 0',
                    },
                    0
                )
                .to('#text1', { left: 0, duration: 60 }, 10)
                .to('#wave1', { y: -10, x: '+=2', duration: 40 }, 0)
                .to('#wave2 ', { y: -10, x: '-=2', duration: 40 }, 0)
                .to('#wave3 ', { y: -10, x: '-=2', duration: 40 }, 0)
                .to('#wave4 ', { y: -10, x: '-=2', duration: 40 , scaleX: 0.6, }, 0)
                

        const tlUp = gsap
            .timeline()
            .to(
                '#fishingline',
                { scaleY: 1, duration: 40, transformOrigin: '0 0' },
                0
            )
            .to(
                '#hook',
                { scale: 0.05, y: 7, duration: 40, transformOrigin: '60% 0' },
                0
            )
            .to(
                '#fishnet',
                {
                    scale: 0.05,
                    y: -3,
                    duration: 40,
                    transformOrigin: '50% 50%',
                },
                0
            )

        // const textIn = gsap.timeline()

        const boatIn = gsap
            .timeline()
            .to('#boatplus', { x: 45, duration: 80 }, 20)
            .to('#wave1', { x: '-=24', duration: 80 }, 0)
            .to('#wave2', { x: '+=4', duration: 80 }, 0)
            .to('#wave3', { x: '-=3', duration: 80 }, 0)
            .to('#wave4', { x: '+=2', duration: 80 }, 0)

        const boatOut = gsap.timeline().to('#boatplus', {
            y: -20.5,
            duration: 40,
            transformOrigin: '0 100%',
        })


        const anim = gsap
            .timeline()
            .add(boatIn)
            .add(tlDrop())
            .add(tlUp)
            .add(boatOut)

        const st = ScrollTrigger.create({
            trigger: '#svgbox',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            markers: false,
            scroller: '#svgcontainer',
            onLeave: () => {
                if (!isNavigating) {
                    dispatch('next')
                }
                isNavigating = true
            },
            onLeaveBack: () => {
                if (!isNavigating) {
                    dispatch('prev')
                }
                isNavigating = true
            },
            animation: anim,
        })

        if (isprevnav) {
            st.scroller.scrollTop = ScrollTrigger.maxScroll(st.scroller)
        }
        gsap.to(st.scroller, { duration: 1.2, scrollTo: { y: '#text-title' } })
    })

    $: textIntro = pageData.text_intro
    $: textBody = pageData.text_bodycopy
    $: textTitle = pageData.text_title
</script>

<style>
    #anim-container {
        width: 100%;
        height: 100%;
    }
    #svgcontainer {
        width: 100%;
        height: 100%;
        overflow: auto;
        position: absolute;
        z-index: 3;
    }
    #svgbox {
        width: 100%;
        display: block;
        height: 400%;
        padding: 40px;
        padding-top: 1000px;
    }

    #svgsvg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: 1;
        opacity: 1;
        background-color: #03037f;
    }

    #text1 {
        position: absolute;
        width: 50%;
        bottom: 10%;
        padding-left: 80px;
        left: -100%;
        z-index: 2;
        font-size: 36px;
        font-weight: bold;
    }
    .content {
        width: 40%;
    }
    #text-title {
        padding-top: 10%;
    }
</style>

<div id="anim-container" transition:fade={{ duration: 2000 }}>
    <div id="svgcontainer">
        <div id="svgbox">
            <h1 id="text-title">{textTitle}</h1>
            <div class="content">
                <div class="text-intro">
                    {@html textBody}
                </div>
            </div>
        </div>
    </div>

    <div id="text1">{textIntro}</div>

    <svg id="svgsvg" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin slice">
        <defs>
            <linearGradient id="bg-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="rgba(84,127,221,1)" />
                <stop offset="100%" stop-color="rgba(3,3,127,1)" />
            </linearGradient>
        </defs>
        <g id="ocean">
            <rect
                width="100"
                height="50"
                x="0"
                y="0"
                fill="url(#bg-gradient)" />
        </g>
        <Wave
            id="wave1"
            x={0}
            y={45}
            scaleX={0.2}
            scaleY={0.02}
            fill="#3333FF" />
        <Wave
            id="wave2"
            x={-4}
            y={46}
            scaleX={0.1}
            scaleY={0.04}
            fill="#1A1ABA" />
        <Wave
            id="wave3"
            x={0}
            y={48}
            scaleX={0.21}
            scaleY={0.2}
            fill="#000099" />
        <Wave
            id="wave4"
            x={-4}
            y={50}
            scaleX={0.2}
            scaleY={0.2}
            fill="#03037F" />
        <g
            id="boatplus"
            transform="translate({startpos.boatplus.x}
            {startpos.boatplus.y} )">
            <Boat id="boat" {...startpos.boat} />
            <Fishet id="fishnet" {...startpos.fishnet} />
            <g id="fishingline">
                <line
                    {...startpos.fishingline}
                    stroke="#fff"
                    stroke-width="0.2" />
            </g>
            <Hook id="hook" {...startpos.hook} />
        </g>
    </svg>
</div>
