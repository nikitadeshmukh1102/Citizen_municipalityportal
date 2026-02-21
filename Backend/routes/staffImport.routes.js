import express from 'express';
import { importStaff } from '../controllers/staffImport.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.post(
  '/import-staff',
  verifyToken,
  allowRoles('ADMIN'),
  importStaff
);

export default router;
