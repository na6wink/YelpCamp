const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seeddb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6439b8a2ba6c4c5bd23b14f0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quas facere sint nam dolores quidem doloremque dignissimos minus corrupti laudantium delectus nobis voluptatibus, nostrum eos iusto magnam quo incidunt exercitationem?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpdm9k4ld/image/upload/v1682288458/YelpCamp/vfivzkjm19c5enyxj2bl.jpg',
                    filename: 'YelpCamp/vfivzkjm19c5enyxj2bl',
                },
                {
                    url: 'https://res.cloudinary.com/dpdm9k4ld/image/upload/v1682036893/samples/landscapes/nature-mountains.jpg',
                    filename: 'YelpCamp/hpyyvhzywhfszrousznx',
                }
            ]
        })
        await camp.save();
    }
}

seeddb().then(() => {
    mongoose.connection.close();
})