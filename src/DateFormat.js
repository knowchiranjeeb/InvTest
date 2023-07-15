const express = require('express');
const pool = require('../db'); // Import the database connection
const authMiddleware = require('../authMiddleware'); // Import the authentication middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DateFormat
 *   description: API endpoints for Date Format
 */

/**
 * @swagger
 * /api/GetDateFormat:
 *   get:
 *     summary: Get all Date Formats
 *     tags: [DateFormat]
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all Date Formats
 *       500:
 *         description: An error occurred while retrieving the Date Formats
 */
router.get('/api/GetDateFormat', authMiddleware, async (req, res) => {
  try {
    const dateFormats = await pool.query('SELECT * FROM public."DateFormat"');
    res.status(200).json(dateFormats.rows);
  } catch (error) {
    console.error('Error retrieving Date Formats:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the Date Formats' });
  }
});

module.exports = router;
