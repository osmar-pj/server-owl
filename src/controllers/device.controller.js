import Device from '../models/Device'
import Parameter from '../models/Parameter'
import mqttClient from '../mqttClient'

export const getDevices = async (req, res) => {
    try {
        const devices = await Device.find({ userId: req.userId })
        res.status(200).json(devices)
    } catch (error) {
        console.log(error)
    }
}

export const createDevice = async (req, res) => {
    try {
        console.log(req.body)
        const { mac, place } = req.body
        // si mac se repite no se crea
        const macRepeat = await Device.findOne({ mac })
        if (macRepeat) return res.status(400).json({ message: 'device already exists' })
        const newDevice = new Device({ mac, place, userId: req.userId })
        const deviceSaved = await newDevice.save()
        res.status(200).json(deviceSaved)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error)
    }
}

export const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.deviceId)
        res.status(200).json(device)
    } catch (error) {
        console.log(error)
    }
}

export const updateDeviceById = async (req, res) => {
    try {
        // const device = await Device.findById(req.params.deviceId)
        // mqttClient.sendMessage(device.mac, JSON.stringify({mode: 'config', data: { nm: req.body.data.nm ,index: req.body.index }}))
        const { data, index, s } = req.body
        console.log(data)

        if (index) {
            const updatedDevice
                = await Device.findByIdAndUpdate(req.params.deviceId
                    , { [`s.${index}`]: { ...s, ...data } }
                    , { new: true })
            return res.status(200).json(updatedDevice)
        } else {
            // update just data
            const updatedDevice
                = await Device.findByIdAndUpdate(req.params.deviceId
                    , { place: data.place }
                    , { new: true })
            return res.status(200).json(updatedDevice)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteDeviceById = async (req, res) => {
    try {
        await Device.findByIdAndDelete(req.params.deviceId)
        res.status(204).json()
    } catch (error) {
        console.log(error)
    }
}

export const wifiCredentials = async (req, res) => {
    try {
        const { ssid, password, mac } = req.body
        mqttClient.sendMessage(mac, JSON.stringify({ ssid, password, mode: "wifi" }))
        res.status(200).json({})
    } catch (error) {
        console.log(error)
    }
}