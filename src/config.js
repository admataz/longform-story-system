require('dotenv').config()

const conf = {
 contentCsvUrl: process.env.CONTENT_CSV_URL || '/sample-data.csv'
}

module.exports = conf
