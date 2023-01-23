import Parameter from '../models/Parameter'

export const getParameters = async (req, res) => {
    try {
        const parameters = await Parameter.find()
        res.status(200).json(parameters)
    } catch (error) {
        console.log(error)
    }
}

export const createParameter = async (req, res) => {
    try {
        const { parameter, icon, category, type } = req.body
        const newParameter = new Parameter({ parameter, icon, category, type })
        const parameterSaved = await newParameter.save()
        res.status(201).json(parameterSaved)
    } catch (error) {
        console.log(error)
    }
}

export const getParameterById = async (req, res) => {
    try {
        const parameter = await Parameter.findById(req.params.parameterId)
        res.status(200).json(parameter)
    } catch (error) {
        console.log(error)
    }
}

export const updateParameterById = async (req, res) => {
    try {
        const updatedParameter = await Parameter.findByIdAndUpdate(req.params.parameterId, req.body, {
            new: true
        })
        res.status(200).json(updatedParameter)
    } catch (error) {
        console.log(error)
    }
}

export const deleteParameterById = async (req, res) => {
    try {
        await Parameter.findByIdAndDelete(req.params.parameterId)
        res.status(200).json()
    } catch (error) {
        console.log(error)
    }
}

export const getParameterByCategory = async (req, res) => {
    try {
        const parameters = await Parameter.find({ category: req.params.category })
        res.status(200).json(parameters)
    } catch (error) {
        console.log(error)
    }
}