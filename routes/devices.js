const {Router} = require('express')
const DeviceController = require('../controllers/device')
const router = Router()


router.get('/api/devices', DeviceController.getAll)

router.post('/api/devices', DeviceController.post)

router.patch('/api/devices', DeviceController.patch)

module.exports = router