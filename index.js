require('dotenv').config()
const jwt = require('jsonwebtoken')
const { secretKey } = require('./config')
const express = require('express')
const mainRouter = require('./mainRouter')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const corsOptions = {
  origin: ['http://localhost:8080', 'https://adv-front.netlify.app', 'http://adv-front.netlify.app'],
  // process.env.ORIGIN_URL || 'http://localhost:8080',
  credentials: true,
  httpOnly: true,

}
const PORT = process.env.PORT || 5000

const app = express().use(cookieParser()).use(cors(corsOptions)).use('/', mainRouter).use(express.json()).listen(PORT, () => console.log(`server started at ${PORT}`))


const start = async () => {
  try {
  } catch (e) {
    console.log(e)
  }
}

start()

