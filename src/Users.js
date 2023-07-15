const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

const siteadd = 'http://www.supergst.com'

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for Users
 */

/**
 * @swagger
 * /api/SaveLog:
 *   post:
 *     summary: Create a new user log record in the UserLog table
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *               logdate:
 *                 type: string
 *                 format: date
 *               logtime:
 *                 type: string
 *               logaction:
 *                 type: string
 *               compid:
 *                 type: integer
 *               isweb:
 *                 type: boolean
 *             required:
 *               - userid
 *               - logdate
 *               - logtime
 *               - logaction
 *               - compid
 *               - isweb
 *     responses:
 *       200:
 *         description: User log record created successfully
 *       400:
 *         description: Invalid request or missing parameters
 *       500:
 *         description: Internal server error
 */
router.post('/api/SaveLog', authenticateToken, async (req, res) => {
  const { userid, logdate, logtime, logaction, compid, isweb } = req.body;

  if (!userid || !logdate || !logtime || !logaction || !compid || !isweb) {
    return res.status(400).json({ error: 'Invalid request or missing parameters' });
  }

  try {
    const insertQuery = 'INSERT INTO "Userlog" (userid, logdate, logtime, logaction, compid, isweb) VALUES ($1, $2, $3, $4, $5, $6)';

    await pool.query(insertQuery, [userid, logdate, logtime, logaction, compid, isweb]);

    return res.status(200).json({ message: 'User log record created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/GetUserRoles:
 *   get:
 *     summary: Get user details from the Users and UserRole tables based on the userid
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Returns the user details
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/api/GetUserRoles', authenticateToken, async (req, res) => {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ error: 'Invalid request or missing parameters' });
  }

  try {
    const query = `
          SELECT u.salid, u.fullname,u.usertype,  u.emailid, u.mobileno, u.compid,
          COALESCE(ur.masters,case when u.usertype='U' then false else true end) as masters, 
          COALESCE(ur.invoice,case when u.usertype='U' then false else true end) as invoice, 
          COALESCE(ur.payment,case when u.usertype='U' then false else true end) as payment,  
          COALESCE(ur.adjustment,case when u.usertype='U' then false else true end) as adjustment,  
          COALESCE(ur.isactive,true) as isactive
          FROM "Users" AS u
          LEFT OUTER JOIN "UserRole" AS ur ON u.userid = ur.userid
          WHERE u.userid = $1
    `;

    const { rows } = await pool.query(query, [userid]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDetails = rows[0];
    return res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;