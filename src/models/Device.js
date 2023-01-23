import { Schema, model } from 'mongoose'
import timezone from 'mongoose-timezone'

const deviceSchema = new Schema(
    {
        mac: String,
        place: String,
        s: [
            {
                type: Object
            }
        ],
        userId: {
            ref: 'User',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

deviceSchema.plugin(timezone)
export default model('Device', deviceSchema)