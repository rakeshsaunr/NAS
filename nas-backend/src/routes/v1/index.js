const express = require('express');
const router = express.Router();

const authRoute = require('./user-routes');
const categoryRoute = require('./category-route');
const productRoute = require('./product-route');
const orderRoute = require('./order-route');
const bannerRoute = require('./banner-route');
const coupanRoute = require('./coupan-route');
const blogRoute = require('./blog-route');
const contactRoute = require('./contact-route');
const callslipRoute = require('./callslip-routes');

router.use('/user', authRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/banner', bannerRoute);
router.use('/coupan', coupanRoute);
router.use('/blog', blogRoute);
router.use('/contact', contactRoute);
router.use('/callslip', callslipRoute);

module.exports = router;