import { Schema, model } from 'mongoose'

const dataSchema = new Schema(
    {
        deviceId: {
            ref: 'Device',
            type: Schema.Types.ObjectId
        },
        s: [
            {
                type: Object
            }
        ],
        timestamp: Number
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            timezone: 'America/Lima'
        },
        versionKey: false
    }
)

export default model('Data', dataSchema)