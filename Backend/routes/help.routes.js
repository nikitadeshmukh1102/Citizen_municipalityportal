import express from 'express';
import {
  submitHelpRequest,
  getAllHelpRequests,
  getHelpContact
} from '../controllers/help.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/role.middleware.js';

const router = express.Router();

// Public help contact info
router.get('/contact', getHelpContact);

// Citizen submits help request
router.post(
  '/',
  verifyToken,
  allowRoles('CITIZEN'),
  submitHelpRequest
);

// Admin views all help requests
router.get(
  '/all',
  verifyToken,
  allowRoles('ADMIN'),
  getAllHelpRequests
);

export default router;
