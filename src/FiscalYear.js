const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Fiscal Year
 *   description: API endpoints for managing Invoice Types
 */

/**
 * @swagger
 * /api/GetFisYear:
 *   get:
 *     summary: Get all Fiscal Years
 *     tags: [Fiscal Year]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of all Fiscal Years
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   invtypeid:
 *                     type: integer
 *                   invtype:
 *                     type: string
 *       500:
 *         description: An error occurred while retrieving the Fiscal Years
 */
router.get('/api/GetFisYear', authMiddleware, async (req, res) => {
  try {
    const fiscalyears = await pool.query('SELECT * FROM public."FiscalYear"');
    res.json(fiscalyears.rows);
  } catch (error) {
    console.error('Error retrieving Fiscal Years:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the Fiscal Years' });
  }
});

module.exports = router;
