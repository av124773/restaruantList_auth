const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Restaurants.find()
    .lean()
    .then(search => {
      const searchResult = search.filter((item) => {
        return item.name.includes(keyword) ||
          item.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          item.category.includes(keyword)
      })
      res.render('index', { restaurants: searchResult, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router