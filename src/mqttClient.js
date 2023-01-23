import mqttHandler from './mqttHandler'

const mqttClient = new mqttHandler()

mqttClient.connect()

export default mqttClient