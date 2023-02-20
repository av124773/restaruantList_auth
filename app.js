const express = require('express')
const mongoose = require('mongoose')

// 僅在非正式機(production)環境使用dotenv
if (process.env.MONGODB_URI !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3001

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection 

db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello word')
})

app.listen(port, () => {
  console.log(`The Express is running on http://localhost:${port}`)
})