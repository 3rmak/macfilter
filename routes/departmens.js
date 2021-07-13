const {Router} = require('express')
const router = Router()
const DepartmentsController = require('../controllers/department')


router.get('/api/departments', DepartmentsController.getAll)

router.post('/api/departments', DepartmentsController.post)


module.exports = router