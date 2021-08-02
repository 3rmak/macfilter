const {v4} = require('uuid')
const Department = require('../models/Department')
const User = require('../models/User')

module.exports = {
  getAll: async (req, res) => {
    try {
        const departments = await Department.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(departments)
    } catch (e) {
        console.warn(e)
    }
  },
  get: async ({params: {id}, req, res}) => {
    try {
        const department = await Department.findById(id)
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.status(200).json(department)
    } catch (e) {
        console.warn(e)
    }
  }, 
  post: async (req, res) => {
    try {
      console.log(req.body)
      const department = {name: req.body.name, devices: req.body.devices, id: v4()}
      const item = new Department({...department})
      await item.save()

      const userIdList = req.body.userIdList
      for (user in userIdList){
        
      }

      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      res.status(201).json({department, message: 'Филиал был успешно добавлен'})
    } catch (error) {
      res.status(500).json({message: 'Ошибка. Новый филиал не был добавлен'})
    }
    
  }
}