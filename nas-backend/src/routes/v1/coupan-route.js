
const express = require('express')
const router = express.Router()
const { AuthMiddleware } = require('../../middlewares')
const { CoupanController } = require('../../controllers')

// creation of new coupan
router.post('/',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CoupanController.createCoupan
)

// fetched all coupan route
router.get('/',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CoupanController.getAllCoupans
)

module.exports = router