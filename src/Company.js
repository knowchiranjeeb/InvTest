const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: API endpoints for Company
 */

/**
 * @swagger
 * /api/GetCompanyDet/{compid}:
 *   get:
 *     security:
 *       - BasicAuth: []
 *     summary: Get company details from the Company table based on compid
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: compid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Returns the company details
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.get('/api/GetCompanyDet/:compid', authenticateToken, async (req, res) => {
    const { compid } = req.params;
  
    if (!compid) {
      return res.status(400).json({ error: 'Invalid request or missing parameters' });
    }
  
    try {
      const query = 'SELECT compname, isgstreg, gstno, logofile, indtypeid, bustypeid, countryid, stateid, street1, street2, city, pincode, phone, email, website, fiscal, "language", dateformatid, panno FROM public."Company" WHERE compid = $1';
      const result = await pool.query(query, [compid]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      }
      else {
        return res.status(404).json({ error: 'Company not found' });
      }
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

/**
 * @swagger
 * /api/UpdComp:
 *   put:
 *     security:
 *       - BasicAuth: []
 *     summary: Update company details in the Company table based on compid
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: compid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Company ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               compname:
 *                 type: string
 *               isgstreg:
 *                 type: boolean
 *               gstno:
 *                 type: string
 *                 maxLength: 15
 *               logofile:
 *                 type: string
 *                 maxLength: 20
 *               indtypeid:
 *                 type: integer
 *               bustypeid:
 *                 type: integer
 *               countryid:
 *                 type: integer
 *               stateid:
 *                 type: integer
 *               street1:
 *                 type: string
 *                 maxLength: 250
 *               street2:
 *                 type: string
 *                 maxLength: 250
 *               city:
 *                 type: string
 *                 maxLength: 100
 *               pincode:
 *                 type: string
 *                 maxLength: 20
 *               phone:
 *                 type: string
 *                 maxLength: 30
 *               email:
 *                 type: string
 *                 maxLength: 150
 *               website:
 *                 type: string
 *                 maxLength: 150
 *               fiscal:
 *                 type: integer
 *               language:
 *                 type: string
 *                 maxLength: 2
 *               dateformatid:
 *                 type: integer
 *               panno:
 *                 type: string
 *                 maxLength: 10
 *             required:
 *               - compname
 *     responses:
 *       200:
 *         description: Company details updated successfully
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.put('/api/UpdComp', authenticateToken, async (req, res) => {
  const { compid } = req.query;
  const {
    compname,
    isgstreg,
    gstno,
    logofile,
    indtypeid,
    bustypeid,
    countryid,
    stateid,
    street1,
    street2,
    city,
    pincode,
    phone,
    email,
    website,
    fiscal,
    language,
    dateformatid,
    panno,
  } = req.body;

  if (!compid || !compname) {
    return res.status(400).json({ error: 'Invalid request or missing parameters' });
  }

  try {
    const updateQuery = `
      UPDATE "Company"
      SET
        compname = $2,
        isgstreg = $3,
        gstno = $4,
        logofile = $5,
        indtypeid = $6,
        bustypeid = $7,
        countryid = $8,
        stateid = $9,
        street1 = $10,
        street2 = $11,
        city = $12,
        pincode = $13,
        phone = $14,
        email = $15,
        website = $16,
        fiscal = $17,
        language = $18,
        dateformatid = $19,
        panno = $20
      WHERE compid = $1
    `;

    const result = await pool.query(updateQuery, [
      compid,
      compname,
      isgstreg,
      gstno,
      logofile,
      indtypeid,
      bustypeid,
      countryid,
      stateid,
      street1,
      street2,
      city,
      pincode,
      phone,
      email,
      website,
      fiscal,
      language,
      dateformatid,
      panno,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    return res.status(200).json({ message: 'Company details updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;  
