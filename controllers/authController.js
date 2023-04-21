
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secretKey } = require("../config")
const fs = require("fs")


const generateAccessToken = (id, role) => {
  const payload = { id, role }
  return jwt.sign(payload, secretKey, { expiresIn: '24h' })
}


class authController {

  async login(req, res) {
    try {
      const { user, password } = req.body
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Credentials', true)
      let usersDB = JSON.parse(fs.readFileSync("./databases/usersDB.json"))
      const userData = usersDB.users.find(u => u.user === user)

      if (!userData) {
        return res.status(401).json({ err: `Пользователь "${user}" не найден` })
      }
      const isValidPassword = bcrypt.compareSync(password, userData.password)

      if (!isValidPassword) {
        return res.status(401).json({ err: `Пароль неверный` })
      }
      const token = generateAccessToken(userData.id, userData.role)
      // return res.json({
      //   token, 
      //   , message: '',
      // }) 
      return res
        .cookie("access_token", token, {
          httpOnly: false,
          secure: false,
        }).status(200).json({ userData: Object.fromEntries(Object.entries(userData).filter(e => e[0] !== 'password')) })


    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Не удалось авторизироваться', e: e })
    }
  }

  async logout(req, res) {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Выход успешен" })
  }


}

module.exports = new authController()