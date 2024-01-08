import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose.connect(process.env.MONGO_URI, {
    // auth: {
    //     user: process.env.MONGO_USER,
    //     password: process.env.MONGO_PASSWORD
    // },
    // authSource: 'admin',
})
.then((db) => console.log('Database connected oh YEAH'))
.catch((err) => console.error(err))