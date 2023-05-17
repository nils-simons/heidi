
const express = require('express')
const cors = require('cors');

const stockTrendScore = require('./api/stockTrendScore')

const app = express()
const port = parseInt(process.env.PORT) || 420

app.use(cors())
app.use(express.json());
app.use(express.static('public'))


app.post('/api/stocktrendscore', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log(`--------------------${req.body.term}/${req.body.n}--------------------`)
  stockTrendScore.stockTrendScore(req.body.term, req.body.n, res)
})
// stockTrendScore.stockTrendScore('LVMH', 10)

app.listen(port, () => {
  console.log(`Tommy running on port ${port}`)
})

