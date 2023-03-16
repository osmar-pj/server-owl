import mqtt from 'mqtt'
import Device from './models/Device'
import Data from './models/Data'
require('dotenv').config()

const socket = require('./socket').socket
class mqttHandler {
    constructor() {
        this.client = {}
        this.options = {
            clientId: process.env.MQTT_CLIENT_ID,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        }
    }

    connect() {
        this.client = mqtt.connect(process.env.MQTT_URL, this.options)
        this.client.on('connect', () => {
            this.client.subscribe(process.env.MQTT_TOPIC_SUBSCRIBE, {qos: 0})
        })
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message)
    }
    
    receiveMessage() {
        this.client.on('message', async (topic, message) => {
            try {
                const data = JSON.parse(message.toString())
                // console.log(data)
                if (data.verify) { socket.io.emit('verify', data.verify) /* enviar la mac al front */ }
                if (data.owl) {
                    // console.log(data.owl)
                    // Revisar si MAC esta registrado y a que usuario pertenece
                    const mac = data.owl.mac
                    const device = await Device.findOne({mac: mac})
                    if (device) {
                        for (let i = 0; i < data.owl.s.length; i++) {
                            device.s[i] = {...device.s[i], ...data.owl.s[i]}
                        }
                        // actualizar la lista de Device
                        await Device.findByIdAndUpdate(device._id, device)
                        // enviar datos al front
                        socket.io.emit('deviceData', device)
                        // guardar dato en base de datos cada tiempo programado en el chip default 10s
                        if (data.owl.save) {
                            const newData = new Data({deviceId: device._id, s: device.s})
                            await newData.save()
                        }
                    }
                }
            } catch (error) {
                // console.error(error, 'un dispositivo no registrado intenta enviar datos de mac')
            }
        })
    }
}

module.exports = mqttHandler

// { "verify": { "mac": "AB:CD:12:23:34:45" } }
// { "owl": { "mac": "12:23:12:23:34:45", "s": [ { "name": "temperature", "value": "23" } ] } }
// { "type": "digital", "mode": "data", "param": [{"value": 1}] }