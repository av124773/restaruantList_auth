const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`The Express is running on http://localhost:${port}`)
})