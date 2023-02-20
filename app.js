const express = require('express')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('hello word')
})

app.listen(port, () => {
  console.log(`The Express is running on http://localhost:${port}`)
})