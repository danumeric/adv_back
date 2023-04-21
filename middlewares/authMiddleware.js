const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')


module.exports = function (req, res, next) {
  // if (req.method === "OPTIONS") {
  //   next()
  // }
  try {
    // const token = req.headers.Authorization.split(' ')[1]
    const token = req.cookies.access_token

    if (!token) {
      return res.status(403).json({ message: 'Токен отсутствует' })
    }
    const decodedData = jwt.verify(token, secretKey)
    req.userId = decodedData.id
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ failedAuth: true, message: 'Токен неверный' })
  }
}