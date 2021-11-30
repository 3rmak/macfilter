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
    get: async ({params: {id}, req, res})=>{
        try {
            const user = await User.findById(id)
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.status(200).json(user).message('Информация о пользователе получена успешно!')
        } catch (error) {
            res.status(500).message('Серверная ошибка. Не удалось получить сведения о пользователе')
        }
    }
    ,
    patch: async (req, res)=>{
        try {
            const requestUser = req.body
            const user = await User.findByIdAndUpdate(requestUser._id, {
                role: requestUser.role,
                access: requestUser.access
                }
            )
            if(requestUser.password !== user.password) {
                // const hashedPass = await bcrypt.hash(requestUser.password, 12)
                await User.updateOne(
                    {_id: user._id},
                    {
                        $set: {
                            password: hashedPass
                        }
                    }).exec()
            }
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.status(200).json({message: "Успех. Изменения сохранены!" })
        } catch (error) {
            res.status(500).json({message: 'Серверная ошибка. Не удалось изменить сведения о пользователе'})
        }
    }
}
