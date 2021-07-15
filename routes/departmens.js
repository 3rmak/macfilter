const {Router} = require('express')
const router = Router()
const DepartmentsController = require('../controllers/department')
const cors = require('cors')

router.use(
  cors({
      origin: "*",
  })
)

router.get('/api/departments', DepartmentsController.getAll)

router.get('/api/departments/:id', DepartmentsController.get)

router.post('/api/departments', DepartmentsController.post)


module.exports = router