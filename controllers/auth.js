const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const {v4} = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    try {

        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array(),
                // message: 'Некорректные данные при регистрации'
                message: 'Некорректные данные при регистрации'
            })
        }

        const { email, password, role, access} = req.body
        console.log("access", access)
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass, role, id: v4(), access})
        await user.save()
        return res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
        return res.status(500).json({ message: 'Невозможно создать пользователя. Серверная ошибка'})
    }

  },
  login: async (req, res) => {
    try {

        const authErrors = validationResult(req)

        if (!authErrors.isEmpty()) {
            
            return res.status(400).json({
                errors: authErrors.array(),
                // message: 'Во время аутентификации произошла ошибка'
                message: 'Во время аутентификации произошла ошибка'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Пользователя с таким email - не существует' })

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        return res.json({ token, user: user, message: 'Авторизовано'})

    } catch (e) {
        return res.status(500).json({ message: 'Вход невозможен. Серверная ошибка' })
    }

  }
}