<script>
  import Scrollmation from '../components/scrollmation.svelte'
  import {cubicOut as easing} from 'svelte/easing'

  let scrollInstance, scrollData
  export let scrollToPos
  export let onNext = () => {}
  export let onPrev = () => {}
  export let onHome = () => {}

  export let startPos = 110 // px past the end
  export let homePos = 80 //px from the top
  export let endPos = 120 // px above the top
  export let duration = 800


  export let isPrevNav = false

  $: console.log('scrollData', scrollData)
</script>

<Scrollmation
  bind:this="{scrollInstance}"
  startPos="{-400}"
  endPos="{0}"
  duration="{900}"
  easing="{easing}"
  isPrevNav="{isPrevNav}"
  bind:scrollData="{scrollData}"
  bind:scrollToPos="{scrollToPos}"
  on:next="{onNext}"
  on:prev="{onPrev}"
  on:home="{onHome}"
>
  <div class="contentpanel" slot="fg">
      <div class="controlpanel">
          <div>startPos: <input type="range" min="-2000" max="2000" bind:value={startPos} /> <input type="text" bind:value={startPos} /></div>
          <div>homePos: <input type="range" min="-2000" max="2000" bind:value={homePos} /> <input type="text" bind:value={homePos} />  {homePos}</div>
          <div>endPos: <input type="range" min="-2000" max="2000" bind:value={endPos} /> <input type="text" bind:value={endPos} /> {endPos}</div>
          <div>duration: <input type="range" min="-2000" max="2000" bind:value={duration} /> <input type="text" bind:value={duration} /> {duration}</div>
        </div>
  </div>

  <div class="backgroundpanel" slot="bg">

  </div>

  

</Scrollmation>



<style>
  .contentpanel{
    border: 1px solid #fff;
  }
  .controlpanel{
    position:absolute;
    top: 20px;
    left: 20px;
  }
</style>
