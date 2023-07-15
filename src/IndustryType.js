const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

// Swagger documentation for IndustryType CRUD API
/**
 * @swagger
 * tags:
 *   name: IndustryType
 *   description: API endpoints for IndustryType
 */

  // API route to get all IndustryTypes
  /**
   * @swagger
   * /api/GetIndustryType:
   *   get:
   *     security:
   *       - BasicAuth: []
   *     summary: Get all IndustryTypes
   *     tags: [IndustryType]
   *     responses:
   *       200:
   *         description: Successfully retrieved all IndustryTypes
   *       500:
   *         description: An error occurred while retrieving the IndustryTypes
   */
  router.get('/api/GetIndustryType', authenticateToken, async (req, res) => {
    try {
      const query = 'SELECT * FROM public."IndustryType"';
      const result = await pool.query(query);
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving IndustryTypes:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the IndustryTypes' });
    }
  });
  
module.exports = router;
