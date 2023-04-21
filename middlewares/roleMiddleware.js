const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')

module.exports = function (req, res, next) {

  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.cookies.access_token
    if (!token) {
      return res.status(403).json({ message: 'no token' })
    }
    const { role: role } = jwt.verify(token, secretKey)// в токен зашит массив ролей
    let isAdmin = role === 'ADMIN'
    if (!isAdmin) {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'ошибка roleMiddleware' })
  }

}