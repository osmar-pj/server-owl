import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then((db) => console.log('Database connected oh YEAH'))
.catch((err) => console.error(err))