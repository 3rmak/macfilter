const {v4} = require('uuid')
const Device = require('../models/Device')
const Department = require('../models/Department')

module.exports = {
  getAll: async (req, res) => {
    try {
        const devices = await Device.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(devices)
    } catch (e) {
        console.warn(e)
    }
  },
  getFromDepartment: async ({params: id, req, res}) => {
    try {
        const idDevices = (Department.findById(id)).devices
        const devices = idDevices.map((val)=>{
            Device.findById(val)
        })
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json({devices, message:"Устройства по заданому департаменту получены успешно!"}) 
    } catch (error) {
        res.status(500).json({message: "Получить доступ к устройствам по заданому департаменту не удалось :("})
    }
  },
  post: async (req, res) => {
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
        res.status(201).json({ message: 'Устройство добавлено' })
    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка' })
        console.log("error occurred", e)
    }
  },
  patch: async(req, res) => {
    try {
    const devices = req.body
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    // if comes array -> change only allowed property
    if(Array.isArray(devices)){
        Object.values(devices).map(cur => {
            // console.log('cur', cur)
            Device.updateOne({_id: cur._id}, {
                $set: {
                    allowed: cur.allowed
                }
            }).exec()
        })
    }
    // if comes only one item -> change all his properties
    else if(typeof devices === 'object' && !Array.isArray(devices)) {
        console.log('here')
        await Device.findByIdAndUpdate({_id: devices._id}, {$set: {...devices} })
    }   
        res.status(200).json({devices, message: "Изменения успешно сохранены!"})
    } catch (e) {
        console.log('Error: ', e)
    }
  }
}

