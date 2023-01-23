import { Schema, model } from 'mongoose'

const parameterSchema = new Schema(
    {
        parameter: String,
        icon: String,
        category: String,
        type: String
    },
    {
        versionKey: false
    }
)

export default model('Parameter', parameterSchema)