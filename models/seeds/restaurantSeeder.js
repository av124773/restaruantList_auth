const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')
const User = require('../users')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash => User.create(
      {
        name: SEED_USER[0].name,
        email: SEED_USER[0].email,
        password: hash
      },
      {
        name: SEED_USER[1].name,
        email: SEED_USER[1].email,
        password: hash
      }
    ))
    .then(user => {
      const seedData = restaurantList.results
      const userOne = Array.from(
        { length: 3 }, 
        (_, i) => Restaurant.create({
          id: seedData[i].id,
          name: seedData[i].name,
          name_en: seedData[i].name_en,
          category: seedData[i].category,
          image: seedData[i].image,
          location: seedData[i].location,
          phone: seedData[i].phone,
          google_map: seedData[i].google_map,
          rating: seedData[i].rating,
          description: seedData[i].description,
          userId: user[0]._id
        })
      )
      const userTwo = Array.from(
        { length: 3 },
        (_, i) => Restaurant.create({
          id: seedData[i + 3].id,
          name: seedData[i + 3].name,
          name_en: seedData[i + 3].name_en,
          category: seedData[i + 3].category,
          image: seedData[i + 3].image,
          location: seedData[i + 3].location,
          phone: seedData[i + 3].phone,
          google_map: seedData[i + 3].google_map,
          rating: seedData[i + 3].rating,
          description: seedData[i + 3].description,
          userId: user[1]._id
        })
      )
      const totalData = userOne.concat(userTwo)
      return Promise.all(totalData)
    })
    .then()
    .then(() => {
      console.log('done')
      process.exit()
    })
})
