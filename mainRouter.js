const Router = require('express')
const bodyParser = require('body-parser')
const router = new Router()
const authContr = require('./controllers/authController')

const jsonParser = bodyParser.json()
const authMiddleware = require('./middlewares/authMiddleware')
const roleMiddleware = require('./middlewares/roleMiddleware')

const { check } = require('express-validator')
const ordersContr = require('./controllers/ordersController')


router.post('/api/login', jsonParser, authContr.login)
router.get('/api/orders', jsonParser, authMiddleware, ordersContr.getOrders)
router.post('/api/add-order', jsonParser, authMiddleware, ordersContr.addOrder)
router.patch('/api/complete-order', jsonParser, [authMiddleware, roleMiddleware], ordersContr.completeOrder)
router.delete('/api/delete-order', jsonParser, [authMiddleware, roleMiddleware], ordersContr.deleteOrder)
router.get('/api/logout', jsonParser, authContr.logout)



module.exports = router