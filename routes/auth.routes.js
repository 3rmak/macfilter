const { Router } = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'email').isEmail(),
        check('password', 'pass').exists(),
        check('position', 'position').exists(),
    ],
    // check('email', 'Неверный email').isEmail(),
    // check('password', 'Минимальный пароль 6 символов').isLength({min: 6})
    async (req, res) => {
        try {

            const validationErrors = validationResult(req)

            if (!validationErrors.isEmpty()) {
                return res.status(400).json({
                    errors: validationErrors.array(),
                    // message: 'Некорректные данные при регистрации'
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
            }

            const hashedPass = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPass , position})

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json( { message: 'Невозможно создать пользователя. Серверная ошибка'})
        }

})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
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
                // return res.status(400).json({ message: 'Пользоватлея с таким email -не существует' })
                return res.status(400).json({ message: 'Пользоватлея с таким email -не существует' })

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

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Вход невозможен. Серверная ошибка' })
        }

    })

module.exports = router
