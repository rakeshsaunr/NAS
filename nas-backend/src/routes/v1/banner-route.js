const express = require('express')
const router = express.Router()
const { BannerController } = require('../../controllers')
const { AuthMiddleware } = require('../../middlewares')
const parser = require('../../middlewares/upload')

router.post('/upload',
    // AuthMiddleware.auth,
    // AuthMiddleware.isAdmin,
    parser.single('url'),
    BannerController.createBanner
)

router.get('/',
    BannerController.getBanners
)

router.delete('/:id',
    BannerController.deleteBanner
)


module.exports = router