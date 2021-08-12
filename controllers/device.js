const {v4} = require('uuid')
const Device = require('../models/Device')
const Department = require('../models/Department')

module.exports = {
  getAll: async (req, res) => {
    try {
        console.log('id all')
        const devices = await Device.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(devices)
    } catch (e) {
        console.warn(e)
    }
  },
  getFromDepartment: async ({params: {id}, req, res}) => {
    try {
        const department = await Department.findById(id)
        const depDevices = (department.devices)
        const devices = []
        for (val of depDevices){
            devices.push(await Device.findById(val))
        }
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json({devices, message:"Устройства по заданому департаменту получены успешно!"}) 
    } catch (error) {
        res.status(500).json({message: "Получить доступ к устройствам по заданому департаменту не удалось :("})
    }
  },
  post: async (req, res) => {
    try {
        
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

        // mac validation stage
        const macRegex = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i
        if(!macRegex.test((req.body).mac)){
            return res.status(500).json({ message: 'Ошибка. Устройство не добавлено. Проверьте правильность написания mac-адреса' })
        }
        
        // check is this mac already exist in that department
        const reqDepartment = (req.body).department
        const devices = await Device.find(
            {'department': reqDepartment}
        )
        const MACs = devices.map((val)=>{
            return val.mac
        })
        if(MACs.includes((req.body).mac)){
            return res.status(500).json({ message: 'Устройство с таким mac-адресом уже существует!' })
        }

        // creating new device
        const device = await {...req.body, id: v4(), addingDate: new Date()}
        const item = await new Device({...device})
        const department = await Department.findOneAndUpdate(
            {_id: item.department},
            {$push: {
                devices: item._id
            }}
            )
        await department.save()
        await item.save()
            .catch((e) => {
                console.log('error', e)
            })

        // creating reference to device in department collection
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
        await Device.findByIdAndUpdate({_id: devices._id}, {$set: {...devices} })
    }   
        res.status(200).json({devices, message: "Изменения успешно сохранены!"})
    } catch (e) {
        console.log('Error: ', e)
    }
  },
  delete: async(req, res) => {
      try {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        console.log("req.body._id", req.body._id)
        const id = req.body._id
        const device = await Device.findById(id)
        const department = await Department.findById(device.department)
        const depDevices = department.devices
        depDevices.splice(depDevices.indexOf(id), 1)
        await department.save()
        await Device.findByIdAndDelete(id)

        res.status(200).json({message: 'Удалено!'})
      } catch (error) {
        res.status(500).json({message: 'Серверная ошибка. Не удалось удалить сведения о пользователе'})
      }
  }
}

