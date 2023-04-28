const express = require('express')
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

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  return Restaurants.find({ userId })
    .lean()
    .sort(sort)
    .then(search => {
      const searchResult = search.filter((item) => {
        return item.name.includes(keyword) ||
          item.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          item.category.includes(keyword)
      })
      res.render('index', { restaurants: searchResult, keyword: keyword, searchResult })
    })
    .catch(error => console.log(error))
})

router.get('/sort/:sortType', (req, res) => {
  const userId = req.user._id
  const index = parseInt(req.params.sortType)
  const keyword = req.query.keyword
  sort = sortType[index]
  return Restaurants.find({ userId })
    .then(() => res.redirect(`/search?keyword=${keyword}`))
    .catch(error => console.log(error))
})

module.exports = router