import getContent from './_pages'
const lookup = new Map();
export function get(req, res, next) {
	const { pgId: slug } = req.params;
	// TODO: this will run on every request...  need a way to memoize this - or does sapper cache results?
	getContent((err, pages) => {
		try{
			const pgData = JSON.parse(pages)
			if(err){
				throw (err)
			}
			pgData.forEach((page, pageIndex) => {
				page._nav = {
					next: null,
					prev: null
				}
				if(!!pgData[pageIndex+1]){
					page._nav.next=pgData[pageIndex+1].slug
				}
				if(!!pgData[pageIndex-1]){
					page._nav.prev=pgData[pageIndex-1].slug
				} 
				lookup.set(page.slug, JSON.stringify(page))
			})
			if (lookup.has(slug)) {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.end(lookup.get(slug));
			} else {
				res.writeHead(404, {
					'Content-Type': 'application/json'
				});
				res.end(JSON.stringify({
					message: `Not found`
				}));
			}
		} catch(err) {
			console.log(err)
		}
	})
}
