import User from '../models/User'
import Role from '../models/Role'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles')
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}