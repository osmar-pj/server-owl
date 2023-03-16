import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        lastname: {
            type: String,
        },
        mobile: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        valid: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                ref: 'Role',
                type: Schema.Types.ObjectId
            }
        ],
        tkn: {
            type: String,
            default: Math.random()
                .toString(36)
                .substring(2, 15) +
                Math.random()
                .toString(36)
                .substring(2, 15)
        },

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

userSchema.statics.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userSchema)