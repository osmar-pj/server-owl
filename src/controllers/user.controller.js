import User from '../models/User'
import Role from '../models/Role'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles')
        // filtrar password de users
        const usersFiltered = users.map(user => {
            const { password, ...userFiltered } = user._doc
            return userFiltered
        })
        // filtrar el user de name con role admin
        const usersFiltered2 = usersFiltered.filter(user => {
            const { roles } = user
            const role = roles.find(role => role.name === 'admin')
            if (role) return false
            return true
        })
        const roles = await Role.find()
        // remove items from array moderator and admin values
        const rolesFiltered = roles.filter(role => {
            if (role.name === 'moderator' || role.name === 'admin') return false
            return true
        })
        res.json({usersFiltered2, rolesFiltered})
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, mobile, valid, roles} = req.body
        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(mobile),
            mobile,
            valid,
            roles
        })
        // get id of roles
        const rolesId = await Role.find({ name: { $in: roles } })
        newUser.roles = rolesId.map(role => role._id)
        
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        console.error(error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('roles')
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

export const updateUserById = async (req, res) => {
    try {
        // actualizar datos de user
        const userUpdateddata = req.body
        const rolesId = await Role.find({ name: { $in: req.body.roles } })
        userUpdateddata.roles = rolesId.map(role => role._id)
        console.log(userUpdateddata)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            userUpdateddata,
            {
                new: true
            }
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error)
    }
}

export const deleteUserById = async (req, res) => {
    try {
        // delete user biy Id
        await User.findByIdAndDelete(req.params.userId)
        res.status(204).json()
    } catch (error) {
        
    }
}