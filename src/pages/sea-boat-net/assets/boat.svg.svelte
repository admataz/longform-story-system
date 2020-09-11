<script>
    export let scrollValues, scrollData
    export let svgObject

    $: w = svgObject && svgObject.getBBox().width
    $: scale =
        scrollValues.toStartRatio !== undefined ? 1/scrollValues.toStartRatio : 1
</script>

<style>
    .cls-1 {
        opacity: 1;
    }
    .cls-2 {
        opacity: 1;
        fill: #fff;
    }
</style>

<svg
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
    viewbox="0 0 510 385"
    x="50"
    y="-15">
    <g
        bind:this={svgObject}
        transform="scale(0.5) translate(40 30)">
        <g
            id="boat"
            transform="scale({scale}) translate({(-w || 0)} {scrollValues.toEndRatio * 200})">
            <g class="cls-1">
                <path
                    class="cls-2"
                    d="M49.67,83.69V122L98.25,133.9V96.7h22.57v42.62l28.54,6.86V83.69Zm35.57,28.17H62.67v-15H85.24Z" />
                <polygon
                    class="cls-2"
                    points="311.27 77.53 311.28 21.42 208.6 75.2 208.6 136.79
                    230.81 136.79 230.81 159.18 250.13 159.18 250.13 202.71
                    20.77 202.71 0 123.06 49.66 135.16 62.67 138.23 142.68
                    157.56 149.36 159.18 173.38 159.18 173.38 136.79 195.59
                    136.79 195.59 67.44 321.67 0 321.67 77.29 311.27 77.53" />
                <rect
                    class="cls-2"
                    x="44.44"
                    y="77.29"
                    width="110.13"
                    height="10.05" />

            </g>
        </g>
    </g>

</svg>
