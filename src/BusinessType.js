const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

// Swagger documentation for BusinessType CRUD API
/**
 * @swagger
 * tags:
 *   name: BusinessType
 *   description: API endpoints for BusinessType
 */


// API route to get all BusinessTypes
/**
 * @swagger
 * /api/GetBusinessType:
 *   get:
 *     security:
 *       - BasicAuth: []
 *     summary: Get all BusinessTypes
 *     tags: [BusinessType]
 *     responses:
 *       200:
 *         description: Successfully retrieved all BusinessTypes
 *       500:
 *         description: An error occurred while retrieving BusinessTypes
 */
router.get('/api/GetBusinessType', authenticateToken, async (req, res) => {
    try {
      const query = 'SELECT * FROM public."BusinessType"';
  
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving BusinessTypes:', error);
      res.status(500).json({ error: 'An error occurred while retrieving BusinessTypes' });
    }
  });
  
  module.exports = router;