const {v4} = require('uuid')
const Department = require('../models/Department')

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
  post: (req, res) => {
    const department = {...req.body, id: v4()}
    const item = new Department({...department})
    item.save()
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.status(201).json(department)
  }
}