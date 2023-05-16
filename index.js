
const express = require('express')


const stockTrendScore = require('./api/stockTrendScore')

const app = express()
const port = parseInt(process.env.PORT) || 420

app.use(express.static('public'))


stockTrendScore.stockTrendScore('LVMH', 10)

app.listen(port, () => {
  console.log(`Tommy running on port ${port}`)
})

