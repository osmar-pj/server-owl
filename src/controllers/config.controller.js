export const getMac = async (req, res) => {
    try {
        const mac = await Device.find().select('mac')
        res.status(200).json(mac)
    } catch (error) {
        console.log(error)
    }
}