import express from 'express';
import { addRemarkAndUpdateStatus } from '../controllers/remark.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/role.middleware.js';

const router = express.Router();

// Staff only
router.post(
  '/add',          // ✅ FIXED (matches frontend)
  verifyToken,
  allowRoles('STAFF'),
  addRemarkAndUpdateStatus
);

export default router;
