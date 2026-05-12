// src/routes/v1/stat-routes.js

const express = require('express');
const router = express.Router();
const { StatController } = require('../../controllers');

// ✅ Health check route (optional but helpful for debugging)
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Stat route root — server reachable' });
});

// ✅ Increment visits API
router.post('/visit', async (req, res, next) => {
  try {
    await StatController.incrementVisits(req, res, next);
  } catch (error) {
    console.error('Error in /visit route:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error (Stat Route)',
    });
  }
});

module.exports = router;
