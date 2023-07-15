const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

/**
 * @swagger
 * tags:
 *   name: State
 *   description: API endpoints for State
 */

/**
 * @swagger
 * /api/GetStates/{countryid}:
 *   get:
 *     security:
 *       - BasicAuth: []
 *     summary: Get all State from Country
 *     tags: [State]
 *     parameters:
 *       - in: path
 *         name: countryid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Country ID
 *     responses:
 *       200:
 *         description: Successfully retrieved all States
 *       500:
 *         description: An error occurred while retrieving the States
 */
router.get('/api/GetStates/:countryid', authenticateToken, async (req, res) => {
    const { countryid } = req.params;

    try {
    const query = 'SELECT * FROM public."States" WHERE countryid = $1';
    const result = await pool.query(query, [countryid]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving States:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the States' });
  }
});

module.exports = router;
