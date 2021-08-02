const {v4} = require('uuid')
const User = require('../models/User')

module.exports = {
    getAll: async (req, res)=>{
        try {
            const users = await User.find()
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: 'Серверная ошибка. Не удалось получить список пользователей из базы данных'})
        }
    },
    patch: async (req, res)=>{
        try {
            const users = await User.findById()
            // res.header("Access-Control-Allow-Origin", "*")
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            // res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: 'Серверная ошибка. Не удалось сведения о пользователе'})
        }
    }
}