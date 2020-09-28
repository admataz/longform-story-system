<script>
    import { onMount, createEventDispatcher } from 'svelte'
    import Boat from './sea-boat-net/boat.svg.svelte'
    import Fishet from './sea-boat-net/fishnet.svg.svelte'
    import Wave from './sea-boat-net/wave.svg.svelte'
    import Hook from './sea-boat-net/hook.svg.svelte'
    import { fade } from 'svelte/transition'

    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

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
            x: 80,
        },
        boat: {
            x: 3.9,
            y: 20,
            scale: 0.2,
        },
        fishnet: {
            x: 60,
            y: 40,
            scale: 0.2,
        },
        fishingline: {
            x1: 67.8,
            y1: 36,
            x2: 67.8,
            y2: 38,
        },
        hook: {
            x: 66.1,
            y: 33,
            scale: 0.2,
        },
    }

    // let nextNaved = false
    onMount(() => {
        const tlDrop = () =>
            gsap
                .timeline()
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
                    '#fishingline',
                    { scaleY: 18, duration: 40, transformOrigin: '0 100%' },
                    0
                )
                .to(
                    '#fishnet',
                    {
                        scale: 0.5,
                        y: 52,
                        duration: 40,
                        transformOrigin: '50% 50%',
                    },
                    0
                )
                .to('#text1', { left: 0, duration: 60 }, 10)

                .to(
                    '#ocean',
                    {
                        y: 12.5,
                        scaleY: 2,
                        duration: 40,
                        transformOrigin: '0% 0%',
                    },
                    0
                )
                .to(
                    '#wave1',
                    { x: '-=11', y: 11.5, scaleY: 0.1, duration: 40 },
                    0
                )
                .to(
                    '#wave2',
                    { x: '+=11', y: 16.2, scaleY: 0.12, duration: 40 },
                    0
                )
                .to(
                    '#wave3',
                    { x: '-=11', y: 22.2, scaleY: 0.14, duration: 40 },
                    0
                )

        const tlUp = gsap
            .timeline()
            .to(
                '#fishingline',
                { scaleY: 1, duration: 40, transformOrigin: '0 0' },
                0
            )
            .to(
                '#hook',
                { scale: 0.05, y: 5, duration: 40, transformOrigin: '50% 0' },
                0
            )
            .to(
                '#fishnet',
                { scale: 0.05, y: 0, duration: 40, transformOrigin: '50% 50%' },
                0
            )

        // const textIn = gsap.timeline()

        const boatIn = gsap
            .timeline()
            .to('#boatplus', { x: 16, duration: 80 }, 20)
            .to('#wave1', { x: '-=11', duration: 80 }, 0)
            .to('#wave2', { x: '+=5', duration: 80 }, 0)
            .to('#wave3', { x: '-=15', duration: 80 }, 0)

        const boatOut = gsap
            .timeline()
            .to('#boatplus', {
                y: -20.5,
                duration: 40,
                transformOrigin: '0 100%',
            })
            .to(
                '#ocean',
                {
                    y: -12.5,
                    // scaleY: 2,
                    duration: 40,
                },
                0
            )
            .to('#wave1', { x: '+=11', y: -12.5, duration: 40 }, 0)
            .to('#wave2', { x: '+=5', y: -12.5, duration: 40 }, 0)
            .to('#wave3', { x: '+=15', y: -12.5, duration: 40 }, 0)

        // const intro = gsap.timeline().to('#svgsvg', {opacity: 1, duration: 40})
        // const outro = gsap.timeline().to('#svgsvg', {opacity: 0.5, duration: 40})

        const anim = gsap
            .timeline()
            // .add(intro)
            .add(boatIn)
            .add(tlDrop())
            .add(tlUp)
            // .add(textIn)
            .add(boatOut)
        // .add(outro)

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
    #anim-container{
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
    #text-title{
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

    <svg id="svgsvg" viewBox="0 0 100 100" style="background-color:#003399">
        <defs>
            <linearGradient id="bg-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="rgba(84,127,221,1)" />
                <stop offset="100%" stop-color="rgba(5,31,68,1)" />
            </linearGradient>
        </defs>
        <g transform="translate(0, {60})" id="ocean">
            <rect
                width="240"
                height={60}
                x="-100"
                y="0"
                fill="url(#bg-gradient)" />
        </g>
        <Wave id="wave1" x={-50} y={58} scale={0.2} />
        <Wave id="wave2" x={30} y={62} scale={0.2} fill="#CCCCFF" />
        <Wave id="wave3" x={-100} y={66} scale={0.15} fill="#CCCCFF" />
        <g id="boatplus" transform="translate({startpos.boatplus.x} 0)">
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
