import papaparse from 'papaparse'
import https from 'https'
import http from 'http'
import config from '../config'

const {contentCsvUrl} = config
const httpModule = contentCsvUrl.substr(0, 8) === 'https://' ? https : http
const pgData = {}

 function getContent(cb) {
  httpModule.get(contentCsvUrl, csvRes => {
    csvRes.setEncoding('utf8')
    let rawData = ''
    csvRes.on('data', chunk => {
      rawData += chunk
    })
    csvRes.on('end', () => {
      try {
        const parsedData = papaparse.parse(rawData, {header: true})
        cb(null, JSON.stringify(parsedData.data))
      } catch (e) {
        cb(e)
      }
    })
  })
}

export default getContent
