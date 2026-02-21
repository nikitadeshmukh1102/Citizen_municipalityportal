import express from 'express';
import { forgotPassword } from '../controllers/passwordReset.controller.js';

const router = express.Router();

router.post('/forgot', forgotPassword);

export default router;
