const {Router} = require('express')
require('dotenv').config()
const {v4} = require('uuid')
const Device = require('../models/Device')
const Department = require('../models/Department')
const router = Router()


router.get('/api/devices', async (req, res) => {
    try {
        const devices = await Device.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(devices)
    } catch (e) {
        console.warn(e)
    }
})

router.post('/api/devices', async (req, res) => {
    try {
        const device = await {...req.body, id: v4()}
        const item = await new Device({...device})
        item.department = await Department.findOne({ 'name': device.department })
        await item.save()
            .catch((e) => {
                console.log('error', e)
            })

        // reference to device in department collection
        await Department.findOneAndUpdate(
            { 'name': device.department },
            { $push: { devices: item.id } },
            function (error, success) {
                if (error) {
                    console.log("Error is ",error);
                } else {
                    console.log("Success:", success);
                }
            })
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(201).json(item)
    } catch (e) {
        console.log("error occurred", e)
    }

})

router.patch('/api/devices', async(req, res) => {
    const devices = {...req.body}
    try {
        Object.values(devices).map(cur => {
            Device.updateOne({_id: cur._id}, {
                $set: {
                    allowed: cur.allowed
                }

            }).exec()
        })
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(devices)
    } catch (e) {
        console.log('Error: ', e)
    }
})

module.exports = router