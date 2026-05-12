
const express = require('express')
const router = express.Router()

const { AuthMiddleware } = require('../../middlewares')
const { ContactController } = require('../../controllers')


// POST req to create contact
router.post('/',
    ContactController.createContact
)


// GET all message to show on the admin panel
router.get('/',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    ContactController.getAllContactDetails
)

router.delete('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    ContactController.deleteContactDetail
)


module.exports = router
