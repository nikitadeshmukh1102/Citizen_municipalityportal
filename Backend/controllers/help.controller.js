import db from '../config/db.js';
import { helpContact } from '../config/helpContact.js';

/* =========================
   SUBMIT HELP REQUEST
   ========================= */
export const submitHelpRequest = async (req, res) => {
  const { user_id, subject, message } = req.body;

  try {
    await db.promise().query(
      `INSERT INTO help_requests
       (user_id, subject, message)
       VALUES (?, ?, ?)`,
      [user_id, subject, message]
    );

    res.status(201).json({
      message: 'Help request submitted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to submit help request'
    });
  }
};

/* =========================
   GET ALL HELP REQUESTS (ADMIN)
   ========================= */
export const getAllHelpRequests = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT 
         h.id,
         u.name,
         u.email,
         h.subject,
         h.message,
         h.status,
         h.created_at
       FROM help_requests h
       JOIN users u ON h.user_id = u.id
       ORDER BY h.created_at DESC`
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch help requests'
    });
  }
};

/* =========================
   GET HELP CONTACT DETAILS
   ========================= */
export const getHelpContact = (req, res) => {
  res.json(helpContact);
};
