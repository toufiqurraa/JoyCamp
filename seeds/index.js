const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/joy-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10

    const camp = new Campground({
      author: '611425e609f889336447633e',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
      images: [
        {
          url: 'https://res.cloudinary.com/totalitarian/image/upload/v1628914142/JoyCamp/zyqn147kltadugej8wne.jpg',
          filename: 'JoyCamp/zyqn147kltadugej8wne',
        },
        {
          url: 'https://res.cloudinary.com/totalitarian/image/upload/v1628937456/JoyCamp/scott-unsplash_velity.jpg',
          filename: 'JoyCamp/scott-unsplash_velity',
        },
      ],
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
