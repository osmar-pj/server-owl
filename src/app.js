// import fs from 'fs'
import http from 'http'
// import https from 'https'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// import path from 'path'
import socket from './socket.js'
import { createRoles } from './libs/initialSetup'
import mqttClient from './mqttClient'

require('dotenv').config()
createRoles()

const app = express()

const corsOptions = {
    origin: process.env.ORIGIN_URL_CLIENT,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mqttClient.receiveMessage()

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import parameterRoutes from './routes/parameter.routes'
import deviceRoutes from './routes/device.routes'
import configRoutes from './routes/config.routes'
import helpRoutes from './routes/help.routes'

app.get('/', (req, res) => {
    console.log(req.userId)
    res.json({message: 'Welcome to the application.'})
})

app.use(`/auth/${process.env.API_VERSION}`, authRoutes)
app.use(`/${process.env.API_VERSION}/user`, userRoutes)
app.use(`/${process.env.API_VERSION}/parameter`, parameterRoutes)
app.use(`/${process.env.API_VERSION}/device`, deviceRoutes)
app.use(`/${process.env.API_VERSION}/config`, configRoutes)
app.use(`/${process.env.API_VERSION}/help`, helpRoutes)

const httpServer = http.createServer(app)
// const httpsServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

socket.connect(httpServer)
httpServer.listen(process.env.PORT)
// httpsServer.listen(process.env.SSL_PORT)

export default app