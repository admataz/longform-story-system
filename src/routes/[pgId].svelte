<script context="module">
    export async function preload({params}) {
      const res = await this.fetch(`pages.json`)
      const pgData = await res.json()
      const pages = pgData.map((page, index) => {
        return {
          ...page,
          _nav: {
            prev: index ? pgData[index - 1] : null,
            next: index + 1 < pgData.length ? pgData[index + 1] : null,
          },
        }
      })
      return {
        pages,
        pgId: params.pgId,
      }
    }
  </script>
  
  <script>
    export let pages, pgId, pgData, scrollToPos, isPrevNav
    import {goto} from '@sapper/app'
    import {fade} from 'svelte/transition'
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
  
    const formatPageData = page => {
      if (!page) {
        return null
      }
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
  
    async function navNext(e) {
      isPrevNav = false
      goto(nextPage.slug)
    }
  
    async function navPrev(e) {
      isPrevNav = true
      goto(prevPage.slug)
    }
  
    function navHome() {}
  
    function onClickPrev() {
      scrollToPos('start')
    }
  
    function onClickNext() {
      scrollToPos('end')
    }
  
    $: currentPage = pages.find(p => p.slug === pgId)
    $: nextPage = currentPage ? currentPage._nav.next : null
    $: prevPage = currentPage ? currentPage._nav.prev : null
    // $: console.log(currentPage.template)
  </script>
  
  <svelte:window on:keydown={onKeyDown}/>

  <div class="nav">
    {#if prevPage} <a href={prevPage.slug} on:click|preventDefault="{onClickPrev}" rel="prefetch">Prev</a>{/if}
    {#if nextPage} <a href={nextPage.slug} on:click|preventDefault="{onClickNext}" rel="prefetch">Next</a>{/if}
  </div>
  
  
  {#each pages as page}
  
  {#if page === prevPage}
  <div class="queued" out:fade>
    <svelte:component this="{templates[prevPage.template]}" {...formatPageData(prevPage)} />
  </div>
  {/if} 
  
  {#if  page === nextPage}
  <div class="queued" out:fade>
    <svelte:component this="{templates[nextPage.template]}" {...formatPageData(nextPage)} />
  </div>
  {/if} 
  
  {#if page === currentPage} 
  <div class="active" transition:fade>
  <svelte:component
    this="{templates[currentPage.template]}"
    {...formatPageData(currentPage)}
    onNext="{navNext}"
    onPrev="{navPrev}"
    onHome="{navHome}"
    bind:scrollToPos="{scrollToPos}"
    {isPrevNav}
  />
  </div>
  {/if} 
  
  {/each}
  
  <style>
  .queued {
    z-index: 1;
    display: none;
    /* position:absolute; */
  }
  
  .active {
    z-index: 11;
    display: block;
    /* position:absolute; */
  }
  </style>