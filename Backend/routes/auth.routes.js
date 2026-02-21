import express from 'express';
import {
  registerCitizen,
  loginUser
} from '../controllers/auth.controller.js';

const router = express.Router();

// Citizen registration
router.post('/register', registerCitizen);

// Login (Citizen / Staff / Admin)
router.post('/login', loginUser);

export default router;
