import db from '../config/db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

/* =========================
   FORGOT PASSWORD
   ========================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const [rows] = await db.promise().query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 15 * 60 * 1000; // 15 mins

    await db.promise().query(
      `UPDATE users
       SET reset_token = ?, reset_token_expiry = ?
       WHERE id = ?`,
      [resetToken, expiry, user.id]
    );

    console.log('RESET TOKEN:', resetToken); // ✅ DEV MODE

    res.json({
      message: 'Password reset link generated',
      resetToken   // ✅ DEV ONLY
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Forgot password failed' });
  }
};

/* =========================
   RESET PASSWORD
   ========================= */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const [rows] = await db.promise().query(
      `SELECT id FROM users
       WHERE reset_token = ?
       AND reset_token_expiry > ?`,
      [token, Date.now()]
    );

    if (!rows.length) {
      return res.status(400).json({ message: 'Invalid / expired token' });
    }

    const user = rows[0];

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.promise().query(
      `UPDATE users
       SET password = ?,
           reset_token = NULL,
           reset_token_expiry = NULL
       WHERE id = ?`,
      [hashedPassword, user.id]
    );

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Reset password failed' });
  }
};
