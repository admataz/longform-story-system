import getContent from './_pages'

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  getContent((err, content) => {
    if (err) {
      throw err
    }
    res.end(content)
  })
}
