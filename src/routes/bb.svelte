<script context="module">
    export async function preload({ params }) {
        const res = await this.fetch(`pages.json`)
        const pgData = await res.json()

        const pagesObj = pgData.reduce((acc, page, index, arr) => {
          const p = {
            ...page,
            _nav: {
                prev: index ? arr[index - 1].slug : null,
                next: index + 1 < arr.length ? arr[index + 1].slug : null,
            },
          }

          acc[page.slug] = p
          return acc;

        }, {})

        // console.log(pagesObj)

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
            pagesObj,
            pgId: params.pgId,
        }
    }
</script>

<script>
  export let pages, pagesObj
  
  console.log(pages, pagesObj)
</script>

<div>
?eh?
</div>