import User from '../models/User'
import Role from '../models/Role'

import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { name, lastname, email, password, roles } = req.body

        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: 'user' })
            newUser.roles = [role._id]
        }

        const savedUser = await newUser.save()

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: 86400*30*12 // 24 hours
        })

        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const signin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate(
            'roles'
        )

        if (!userFound) return res.status(400).json({ message: 'User not found' })

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        )

        if (!matchPassword)
            return res.status(401).json({ token: null, message: 'Invalid account or password' })

        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
            expiresIn: 86400*30*12 // 12 meses
        })

        res.json({
            user: userFound.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
