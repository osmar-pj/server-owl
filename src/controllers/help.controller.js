import Device from '../models/Device'
import mqttClient from '../mqttClient'

export const getDeviceParam = async (req, res) => {
    try {
        const { mac } = req.params
        const device = await Device.findOne({ mac })
        mqttClient.sendMessage(mac, JSON.stringify({mode: "verify"}))
        res.status(200).json(device)
    } catch (error) {
        console.log(error)
    }
}

export const setDeviceParam = async (req, res) => {
    try {
        const { mac } = req.params
        const { value } = req.body
        mqttClient.sendMessage(mac, JSON.stringify({mode: 'data', data: { s: value.data, index: value.index }}))
        res.status(200).json({data: 'data'})
    } catch (error) {
        console.log(error)
    }
}

export const setDeviceInitial = async (req, res) => {
    try {
        const { mac } = req.params
        const { initial, prod } = req.body
        mqttClient.sendMessage(mac, JSON.stringify({mode: 'initial', initial, prod}))
        res.status(200).json({updated: true})
    } catch (error) {
        console.log(error)
    }
}