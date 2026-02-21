import express from 'express';
import {
  forgotPassword,
  resetPassword,
  changePassword
} from '../controllers/userPassword.controller.js';   // ✅ NEW NAME

const router = express.Router();

router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);
router.post('/change', changePassword);

export default router;
