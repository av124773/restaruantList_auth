const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection 

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  restaurantList.results.forEach((data) => {
    Restaurant.create({
      id: data.id,
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description
    })
  })
  console.log('done')
})

