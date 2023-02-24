const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurant')

router.get('/:sort', (req, res) => {
  const sortType = req.params.sort
  return Restaurants.find()
    .lean()
    .sort({ _id: sortType })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router