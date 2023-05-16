
const express = require('express')
const app = express()
const port = process.env.PORT || 420

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Tommy running on port ${port}`)
})

