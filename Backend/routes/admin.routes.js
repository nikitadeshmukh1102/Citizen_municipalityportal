import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/role.middleware.js';

import {
  assignComplaint,
  getAllComplaints
} from '../controllers/complaint.controller.js';

import db from '../config/db.js';

const router = express.Router();

/* =========================
   GET ALL COMPLAINTS (ADMIN)
   ========================= */
router.get(
  '/complaints',
  verifyToken,
  allowRoles('ADMIN'),
  getAllComplaints
);

/* =========================
   GET STAFF LIST
   ========================= */
router.get(
  '/staff',
  verifyToken,
  allowRoles('ADMIN'),
  async (req, res) => {

    try {
      const [rows] = await db.promise().query(
        `SELECT id, name, email, department
         FROM users
         WHERE role = 'STAFF' AND is_active = TRUE`
      );

      res.json(rows);

    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch staff list' });
    }
  }
);

/* =========================
   ASSIGN STAFF
   ========================= */
router.put(
  '/assign/:complaintId',
  verifyToken,
  allowRoles('ADMIN'),
  assignComplaint
);

export default router;
