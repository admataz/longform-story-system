<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`/${params.pgId}.json`)
		const data = await res.json()
		if (res.status === 200) {
			return { page: data  }
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let page;
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import marked from 'marked'
  import ChapterTitle from '../pagetemplates/ChapterTitle.svelte'
  import TextMediaSplit from '../pagetemplates/TextMediaSplit.svelte'
  import VideoFull from '../pagetemplates/VideoFull.svelte'
  import TextBgMedia from '../pagetemplates/TextBgMedia.svelte'
  import TextImage from '../pagetemplates/TextImage.svelte'
  import TextVideo from '../pagetemplates/TextVideo.svelte'

  const templates = {
    'chapter-title': ChapterTitle,
    'text-media-split': TextMediaSplit,
    'video-full': VideoFull,
    'text-bg-media': TextBgMedia,
    'text-image': TextImage,
    'text-video': TextVideo,
  }

  export let currentPage = 0
  let scrollToPos
  let pg
  let isPrevNav = false

  const pageData = page => {
    return {
      ...page,
      text_intro: marked(page.text_intro),
      text_bodycopy: marked(page.text_bodycopy),
    }
  }

  export function onKeyDown({key}) {
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      scrollToPos('end', true)
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      scrollToPos('start', true)
    }
  }

  $: pg = pageData(page)
  $: template = templates[pg.template]
 
  

  function navNext(){
    if(!page._nav.next){
        return
      }
    isPrevNav = false
    goto(page._nav.next)
    }
    
    function navPrev(){
      if(!page._nav.prev){
        return
      }
      isPrevNav = true
      goto(page._nav.prev)
  }

  function navHome(){
  }

  function onClickPrev(){
    scrollToPos('start')
  }

  function onClickNext(){
    scrollToPos('end')
  }

</script>


<svelte:window on:keydown={onKeyDown}/>

<div class="contentWrapper">
    <div class="nav">
        <a href={page._nav.prev} rel="prefetch" on:click|preventDefault={onClickPrev}>Prev</a>
        <a href={page._nav.next} rel="prefetch" on:click|preventDefault={onClickNext}>Next</a>
      </div>
  <svelte:component 
  this={template} 
  {...pg} 
  onNext={navNext}
  onPrev={navPrev}
  onHome={navHome}
  bind:scrollToPos={scrollToPos}
  {isPrevNav}
  />
</div>



