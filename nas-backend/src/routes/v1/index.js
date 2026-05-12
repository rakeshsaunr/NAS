const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-routes');
const blogRoutes = require('./blog-routes');
const contactRoutes = require('./contact-routes');
const statRoutes = require('./stat-routes');
const projectRoutes = require('./project-routes');
const callslipRoutes = require('./callslip-routes');
const servicecallRoutes = require('./servicecall-routes');
const categoryRoutes = require('./category-routes');
const departmentRoutes = require('./department-routes');
const customerRoutes = require('./customer-routes');

// Register routes
router.use('/auth', authRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/stat', statRoutes);
router.use('/project', projectRoutes);
router.use('/callslip', callslipRoutes);
router.use('/servicecall', servicecallRoutes);
router.use('/category', categoryRoutes);
router.use('/department', departmentRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
