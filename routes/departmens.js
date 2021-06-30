const {Router} = require('express')
require('dotenv').config()
const {v4} = require('uuid')
const Department = require('../models/Department')
const router = Router()


router.get('/api/departments', async (req, res) => {
    try {
        const departments = await Department.find()
        await res.status(200).json(departments)
    } catch (e) {
        console.warn(e)
    }
})

router.post('/api/departments', (req, res) => {
    const department = {...req.body, id: v4()}
    const item = new Department({...department})
    item.save()
    res.status(201).json(department)
})


module.exports = router