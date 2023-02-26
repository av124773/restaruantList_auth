const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const Restaurants = require('../../models/restaurant')

const sortType = [
  { _id: 'desc' },
  { _id: 'asc' },
  { name: 'asc' }, 
  { name: 'desc' }, 
  { category: 'asc' }, 
  { location: 'asc' }
]
let sort = sortType[0]

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/sort/:sortType', (req, res) => {
  const index = parseInt(req.params.sortType)
  sort = sortType[index]
  return Restaurants.find()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router