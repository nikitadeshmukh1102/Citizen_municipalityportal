import express from 'express';
import { uploadProof } from '../middleware/upload.middleware.js';

import {
  createComplaint,
  createComplaintWithProof,
  getAllComplaints,
  getMyComplaints,
  searchComplaints,
  updateMyComplaint,
  deleteMyComplaint,

  /* ✅ ADD ONLY THIS */
  assignComplaint

} from '../controllers/complaint.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/role.middleware.js';

const router = express.Router();

/* =========================
   CREATE COMPLAINT (Citizen)
   ========================= */
router.post(
  '/create',
  verifyToken,
  allowRoles('CITIZEN'),
  createComplaint
);

/* =========================
   VIEW ALL (Staff / Admin)
   ========================= */
router.get(
  '/all',
  verifyToken,
  allowRoles('STAFF', 'ADMIN'),
  getAllComplaints
);

/* =========================
   CREATE WITH PROOF
   ========================= */
router.post(
  '/create-with-proof',
  uploadProof.single('proof'),
  createComplaintWithProof
);

/* =========================
   MY COMPLAINTS (Citizen)
   ========================= */
router.get(
  '/my/:citizen_id',
  verifyToken,
  allowRoles('CITIZEN'),
  getMyComplaints
);

/* =========================
   UPDATE (Citizen)
   ========================= */
router.put(
  '/update/:complaint_id',
  verifyToken,
  allowRoles('CITIZEN'),
  updateMyComplaint
);

/* =========================
   DELETE (Citizen)
   ========================= */
router.delete(
  '/delete/:complaint_id',
  verifyToken,
  allowRoles('CITIZEN'),
  deleteMyComplaint
);

/* =========================
   SEARCH (Staff / Admin)
   ========================= */
router.get(
  '/search',
  verifyToken,
  allowRoles('STAFF', 'ADMIN'),
  searchComplaints
);

/* =========================
   ✅ ✅ ADMIN ASSIGN STAFF
   ========================= */
router.put(
  '/admin/assign/:complaintId',
  verifyToken,
  allowRoles('ADMIN'),
  assignComplaint
);

export default router;
