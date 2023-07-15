const express = require('express');
const pool = require('../db'); // Import the database connection
const authMiddleware = require('../authMiddleware'); // Import the authentication middleware

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Language
 *   description: API endpoints for Language
 */

/**
 * @swagger
 * /api/GetLang:
 *   get:
 *     summary: Get all Languages
 *     tags: [Language]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all Languages
 *       500:
 *         description: An error occurred while retrieving the Languages
 */
router.get('/api/GetLang', authMiddleware, async (req, res) => {
  try {
    const languages = await pool.query('SELECT * FROM public."Language"');
    res.status(200).json(languages.rows);
  } catch (error) {
    console.error('Error retrieving Languages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the Languages' });
  }
});

module.exports = router;
