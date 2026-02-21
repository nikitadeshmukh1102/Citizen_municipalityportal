import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const importStaff = async (req, res) => {
  const filePath = path.join(
    process.cwd(),
    'uploads/staff-imports/municipal_staff_master.csv'
  );

  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        for (const staff of results) {
          const { emp_id, name, email, department } = staff;

          // check duplicate email
          const [existing] = await db
            .promise()
            .query('SELECT id FROM users WHERE email = ?', [email]);

          if (existing.length > 0) continue;

          const tempPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(tempPassword, 10);

          await db.promise().query(
            `INSERT INTO users
             (emp_id, name, email, password, role, department)
             VALUES (?, ?, ?, ?, 'STAFF', ?)`,
            [emp_id, name, email, hashedPassword, department]
          );
        }

        res.json({ message: 'Staff dataset imported successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Import failed' });
      }
    });
};
