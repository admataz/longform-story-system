<script>
    import { onMount, createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

    import Highlighted from './map/highlighted.svg.svelte'
    import BaseMap from './map/map.svg.svelte'
    import MapSpots from './map/spots.svg.svelte'

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

    const anim = gsap.timeline()

    onMount(() => {
        const st = ScrollTrigger.create({
            trigger: '#text1',
            start: 'top top',
            end: 'bottom bottom',
            markers: false,
            scroller: '#svgcontainer',
            onLeaveBack: () => {
                if (!isNavigating) {
                    dispatch('prev')
                }
                isNavigating = true
            },
        })
        const st2 = ScrollTrigger.create({
            trigger: '#text2',
            start: 'top bottom',
            end: 'bottom bottom',
            markers: false,
            scroller: '#svgcontainer',
            animation: gsap
                .timeline()
                .to('#highlighted', { stroke: '#f4971d', fill: '#f4971d', duration: 0.8 })
                .to('#spots', { opacity: 1, duration: 0.8 }),
        })

        const st3 = ScrollTrigger.create({
            trigger: '#text3',
            start: 'top bottom',
            end: 'bottom bottom',
            markers: false,
            scroller: '#svgcontainer',
            onLeave: () => {
                if (!isNavigating) {
                    dispatch('next')
                }
                isNavigating = true
            },
            animation: gsap
                .timeline()

                .to('#mapcontainer', {
                  scale: 0.3,
                    x: -100,
                    y: -140,
                    duration: 0.8,
                })
                .to('#viareggio-label', {
                  opacity: 1, duration: 0.8
                })
                .to('#spots', {opacity: 0, duration: 0.8})
        })
    })
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
    .svgbox {
        width: 100%;
        display: block;
        height: 100%;
        padding: 40px;
        /* padding-bottom: 120%; */

        max-width: 60%;
        box-sizing: content-box;
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
        padding-top: 30%;
    }
        


    .content {
        max-width: 50%;
        font-size: 18px;
        margin: 80px;
        height: 100%;
    }

</style>

<div id="anim-container" transition:fade={{ duration: 2000 }}>
    <div id="svgcontainer">

        <div class="content">
        <div class="svgbox" id="text1">
            <h1>Casting a wide net</h1>
            <p>
                The backbone of the MINOUW project was a series of field tests
                and evaluations of possible solutions - modified fishing gear,
                new and innovative techniques - in fisheries across Europe, with
                fishers and scientists working closely together.
            </p>
        </div>
        <div class="svgbox" id="text2">
            <p>
                The MINOUW project set up 16 case studies spread across 6
                countries. From lobster and shrimp in Portugal, to hake and
                mullet in Italy, and cod in Norway, the team evaluated possible
                solutions in fisheries based on trawl gears, purse seines,
                dredges, traps, pots, nets and loglines.
            </p>
        </div>
        <div class="svgbox" id="text3">
            <p>
                The project’s ‘bottom-up’ philosophy aimed to produce innovative
                solutions from fishers and for fishers. This meant using
                scientific methods to evaluate solutions proposed by the
                Fisherman themselves. Often these would involve tried and tested
                techniques that fishers have been using successfully for many
                years.
            </p>
            <p>
                One of the most successful of these was found in the prawn
                fishery of Viareggio, Italy.
            </p>
        </div>
        </div>
    </div>

    <svg id="svgsvg" viewBox="0 0 100 100" preserveAspectRatio="xMaxYMid meet">
        <g transform="scale(0.12)" id="mapcontainer">
            <g opacity="0.5">
                <BaseMap x={64.58} y={53.53} />
                <Highlighted id="highlighted" x={112.7} y={19.85} />
                <MapSpots opacity={0} id="spots" y={317} x={106} />
            </g>
            <g fill="#00ae42" opacity="0" id="viareggio-label">
                <text x="263.63" y="601.89"  fill="#fff">Viareggio</text>
                <path
                    class="cls-4"
                    d="M263.63,601.89a3.11,3.11,0,1,1-3.1-3.11A3.1,3.1,0,0,1,263.63,601.89Z" />
            </g>
        </g>
    </svg>

</div>
