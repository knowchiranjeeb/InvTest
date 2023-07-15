const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: API endpoints for Country
 */

/**
 * @swagger
 * /api/GetCountries:
 *   get:
 *     security:
 *       - BasicAuth: []
 *     summary: Get all Countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Successfully retrieved all Countries
 *       500:
 *         description: An error occurred while retrieving the Countries
 */
router.get('/api/GetCountries', authenticateToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM public."Country"';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving Countries:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the Countries' });
  }
});

module.exports = router;
