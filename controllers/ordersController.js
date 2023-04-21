
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { secretKey } = require("../config")
const fs = require("fs")

class ordersController {

  async getOrders(req, res) {
    try {
      let ordersDB = JSON.parse(fs.readFileSync("./databases/ordersDB.json"))
      return res.status(200).json(ordersDB)
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Не удалось запросить orders', e: e })
    }
  }
  async addOrder(req, res) {
    try {
      const { name, address, comment, dateTS, isCompleted } = req.body
      let ordersDB = JSON.parse(fs.readFileSync("./databases/ordersDB.json"))
      let newID = ordersDB.orders[ordersDB.orders.length - 1].id + 1 || 1
      ordersDB.orders.push({ id: newID, name, address, comment, dateTS, isCompleted })

      fs.writeFile("./databases/ordersDB.json", JSON.stringify(ordersDB), function (error) {
        if (error) throw error
      })
      return res.status(201).json({ message: 'Успешно добавлено' })

    } catch (e) {
      console.log(e)

    }
  }
  async completeOrder(req, res) {
    try {
      const { id } = req.body
      console.log(id)
      let ordersDB = JSON.parse(fs.readFileSync("./databases/ordersDB.json"))
      let order = ordersDB.orders.find(o => o.id === id)
      order.isCompleted = true
      fs.writeFile("./databases/ordersDB.json", JSON.stringify(ordersDB), function (error) {
        if (error) throw error
      })
      return res.status(201).json({ message: 'Заказ выполнен' })

    } catch (e) {
      console.log(e)

    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.body
      console.log(id)
      let ordersDB = JSON.parse(fs.readFileSync("./databases/ordersDB.json"))
      ordersDB.orders = ordersDB.orders.filter(o => o.id !== id)
      fs.writeFile("./databases/ordersDB.json", JSON.stringify(ordersDB), function (error) {
        if (error) throw error
      })
      return res.status(201).json({ message: 'Заказ удалён' })

    } catch (e) {
      console.log(e)

    }
  }



}

module.exports = new ordersController()