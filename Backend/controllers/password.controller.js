import crypto from 'crypto';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { sendResetEmail } from '../utils/email.util.js';

/* =========================
   FORGOT PASSWORD ✅ FIXED
   ========================= */
export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  try {

    if (!email) {
      return res.status(400).json({
        message: 'Email required'
      });
    }

    /* 🔥🔥🔥 CRITICAL FIX */
    const cleanEmail = email.trim().toLowerCase();

    const [users] = await db
      .promise()
      .query(
        'SELECT id FROM users WHERE email = ?',
        [cleanEmail]
      );

    if (users.length === 0) {
      return res.status(400).json({
        message: 'Email not registered'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 15 * 60 * 1000;

    await db.promise().query(
      `UPDATE users
       SET reset_token = ?, reset_token_expiry = ?
       WHERE email = ?`,
      [resetToken, expiry, cleanEmail]
    );

    sendResetEmail(cleanEmail, resetToken);

    res.json({
      message: 'Password reset link sent'
    });

  } catch (err) {

    console.error('FORGOT PASSWORD ERROR:', err);

    res.status(500).json({
      message: 'Forgot password failed'
    });
  }
};

/* =========================
   RESET PASSWORD (UNCHANGED ✅)
   ========================= */
export const resetPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {

    const [users] = await db.promise().query(
      `SELECT id FROM users
       WHERE reset_token = ?
       AND reset_token_expiry > ?`,
      [token, Date.now()]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: 'Token invalid or expired'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.promise().query(
      `UPDATE users
       SET password = ?, 
           reset_token = NULL, 
           reset_token_expiry = NULL
       WHERE reset_token = ?`,
      [hashedPassword, token]
    );

    res.json({
      message: 'Password reset successful'
    });

  } catch (err) {

    console.error('RESET PASSWORD ERROR:', err);

    res.status(500).json({
      message: 'Reset password failed'
    });
  }
};
