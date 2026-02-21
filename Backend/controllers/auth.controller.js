import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// ==========================
// Citizen registration
// ==========================
export const registerCitizen = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existing] = await db
      .promise()
      .query('SELECT id FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      return res.status(400).json({
        message: 'User already exists with this email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, 'CITIZEN')`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Citizen registered successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Registration failed'
    });
  }
};

// ==========================
// Login (Citizen / Staff / Admin)
// ==========================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db
      .promise()
      .query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // ✅ ADD-1 → ACCOUNT ACTIVE CHECK
    if (!user.is_active) {
      return res.status(403).json({
        message: 'Account is disabled. Contact admin.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        department: user.department
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // ✅ ADD-2 → FORCE PASSWORD CHANGE LOGIC
    const forcePasswordChange =
      user.role === 'STAFF' && user.is_first_login;

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        department: user.department,

        // existing flag (safe)
        isFirstLogin: user.is_first_login,

        // ✅ NEW FLAG
        forcePasswordChange
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'Login failed'
    });
  }
};
