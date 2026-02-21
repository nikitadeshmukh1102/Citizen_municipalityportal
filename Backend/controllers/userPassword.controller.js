import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../config/db.js';
import { sendResetEmail } from '../utils/email.util.js';

/* =========================
   FORGOT PASSWORD
   ========================= */
export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  try {

    if (!email) {
      return res.status(400).json({
        message: 'Email required'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const [rows] = await db.promise().query(
      `SELECT id FROM users WHERE email = ?`,
      [cleanEmail]
    );

    if (!rows.length) {
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

    console.log("RESET TOKEN →", resetToken);

    /* ✅ SEND EMAIL */
    await sendResetEmail(cleanEmail, resetToken);

    console.log("✅ RESET EMAIL SENT");

    res.json({
      message: 'Password reset link sent'
    });

  } catch (err) {

    console.error("❌ FORGOT PASSWORD ERROR:", err);

    res.status(500).json({
      message: 'Forgot password failed'
    });
  }
};

/* =========================
   RESET PASSWORD
   ========================= */
export const resetPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {

    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Missing fields'
      });
    }

    const [rows] = await db.promise().query(
      `SELECT id, reset_token_expiry
       FROM users
       WHERE reset_token = ?`,
      [token]
    );

    if (!rows.length) {
      return res.status(400).json({
        message: 'Token not valid'
      });
    }

    if (rows[0].reset_token_expiry < Date.now()) {
      return res.status(400).json({
        message: 'Token expired'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.promise().query(
      `UPDATE users
       SET password = ?,
           reset_token = NULL,
           reset_token_expiry = NULL
       WHERE id = ?`,
      [hashedPassword, rows[0].id]
    );

    res.json({
      message: 'Password reset successful'
    });

  } catch (err) {

    console.error("❌ RESET PASSWORD ERROR:", err);

    res.status(500).json({
      message: 'Reset password failed'
    });
  }
};

/* =========================
   CHANGE PASSWORD
   ========================= */
export const changePassword = async (req, res) => {

  const { user_id, currentPassword, newPassword } = req.body;

  try {

    if (!user_id || !currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Missing fields'
      });
    }

    const [rows] = await db.promise().query(
      `SELECT password FROM users WHERE id = ?`,
      [user_id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      rows[0].password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Current password incorrect'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.promise().query(
      `UPDATE users
       SET password = ?
       WHERE id = ?`,
      [hashedPassword, user_id]
    );

    res.json({
      message: 'Password changed successfully'
    });

  } catch (err) {

    console.error("❌ CHANGE PASSWORD ERROR:", err);

    res.status(500).json({
      message: 'Password change failed'
    });
  }
};
