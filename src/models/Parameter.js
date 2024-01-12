import { Schema, model } from 'mongoose'

const parameterSchema = new Schema(
    {
        parameter: String,
        icon: String,
        category: String,
        type: String,
        al: Number,
        ah: Number
    },
    {
        versionKey: false
    }
)

export default model('Parameter', parameterSchema)