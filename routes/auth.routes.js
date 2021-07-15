const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const passport = require('passport')
const router = Router()
const cors = require('cors')
const AuthController = require('../controllers/auth')

router.use(
    cors({
        origin: "*",
    })
)
// /api/auth/register
router.post(
    '/api/auth/register',
    [     
        check('email', 'email').isEmail(),
        check('password', 'pass').exists(),
        check('role', 'role').exists(),
    ],
    // check('email', 'Неверный email').isEmail(),
    // check('password', 'Минимальный пароль 6 символов').isLength({min: 6})
    AuthController.register
   )

// /api/auth/login
router.post(
    '/api/auth/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    AuthController.login
    )

module.exports = router
