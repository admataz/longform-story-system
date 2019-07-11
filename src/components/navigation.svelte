<script>
    export let pgData, segment
    const chapterTitles = pgData.filter(p => p.template === 'chapter-title')

    $: currIndex = pgData.map(p=>p.slug).indexOf(segment)
    $: console.log(currIndex)
    $: console.log(segment)
</script>

<style>
    .navigation {
        position: absolute;
        right: 0;
        z-index: 3000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100px;
        padding: 80px 40px;
        background-color: rgba(0, 0, 0, 0.6)
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

    .nav-circle{
        fill:#fff;
        height: 24px;
        width: 24px;
        display:block;
        flex-shrink: 1;
    }
    .nav-line{
      display:block;
      flex-grow: 1;
      stroke-width: 4px;
      padding: 0;
      height: 60%;
      stroke: #fff;
    }

    .nav-item.activated .nav-line{
      stroke: #FFA52A;
    }

    .nav-item.activated .nav-circle{
      fill: #FFA52A;
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

    .nav-item:first-child .nav-line{
      display: none;
    }
</style>

<div class="navigation">
    {#each chapterTitles as pg}
        <div class="nav-item {pg.index <= currIndex && 'activated'}" >
            <svg class="nav-line" viewBox="0 0 100 100">
                <line
                    x1="50%"
                    y1="0"
                    x2="50%"
                    y2="100%"
                     />
            </svg>

            <a href="/{pg.slug}">
                <svg class="nav-circle" viewBox="0 0 100 100">
                    <circle cx="50%" cy="50%" r="50" />
                </svg>

            </a>

            

        </div>
    {/each}
</div>
