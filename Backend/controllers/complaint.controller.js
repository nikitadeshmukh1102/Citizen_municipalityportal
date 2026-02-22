import db from '../config/db.js';

/* =========================
   CREATE COMPLAINT (Citizen)
   ========================= */
export const createComplaint = async (req, res) => {
  const { citizen_id, title, description, category } = req.body;

  try {
    const complaintCode = 'CRP' + Date.now();

    await db.promise().query(
      `INSERT INTO complaints
       (complaint_code, citizen_id, title, description, category)
       VALUES (?, ?, ?, ?, ?)`,
      [complaintCode, citizen_id, title, description, category]
    );

    res.status(201).json({
      message: 'Complaint registered successfully',
      complaint_code: complaintCode
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Complaint creation failed' });
  }
};

/* =========================
   CREATE WITH PROOF
   ========================= */
export const createComplaintWithProof = async (req, res) => {
  const { citizen_id, title, description, category } = req.body;

  try {
    const proofPath = req.file ? req.file.path.replace(/\\/g, '/') : null;
    const complaintCode = 'CRP' + Date.now();

    await db.promise().query(
      `INSERT INTO complaints
       (complaint_code, citizen_id, title, description, category, proof)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [complaintCode, citizen_id, title, description, category, proofPath]
    );

    res.status(201).json({
      message: 'Complaint registered with proof',
      complaint_code: complaintCode
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Complaint with proof failed' });
  }
};

/* =========================
   VIEW ALL COMPLAINTS ✅ FIXED
   ========================= */
export const getAllComplaints = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT 
          c.id,
          c.complaint_code,
          c.title,
           c.description, 
          c.category,
          c.status,
          c.proof,
          c.created_at,

          citizen.name AS citizen_name,
          staff.name AS staff_name

       FROM complaints c

       LEFT JOIN users citizen 
         ON c.citizen_id = citizen.id

       LEFT JOIN users staff 
         ON c.assigned_staff_id = staff.id

       ORDER BY c.created_at DESC`
    );

    /* ✅ REMARKS ATTACH FIX */
    for (let complaint of rows) {

      const [remarks] = await db.promise().query(
        `SELECT * FROM remarks
         WHERE complaint_id = ?
         ORDER BY id ASC`,
        [complaint.id]
      );

      complaint.remarks = remarks;   // 🔥 CRITICAL FIX
    }

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

/* =========================
   GET MY COMPLAINTS (Citizen) ✅ FIXED
   ========================= */
export const getMyComplaints = async (req, res) => {
  const { citizen_id } = req.params;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
          id,
          complaint_code,
          title,
          category,
          status,
          proof,
          created_at
       FROM complaints
       WHERE citizen_id = ?
       ORDER BY created_at DESC`,
      [citizen_id]
    );

    /* ✅ REMARKS ATTACH FIX */
    for (let complaint of rows) {

      const [remarks] = await db.promise().query(
        `SELECT * FROM remarks
         WHERE complaint_id = ?
         ORDER BY id ASC`,
        [complaint.id]
      );

      complaint.remarks = remarks;   // 🔥 FIX
    }

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

/* =========================
   UPDATE MY COMPLAINT
   ========================= */
export const updateMyComplaint = async (req, res) => {
  const { complaint_id } = req.params;
  const { citizen_id, title, description } = req.body;

  try {
    await db.promise().query(
      `UPDATE complaints
       SET title = ?, description = ?
       WHERE id = ? AND citizen_id = ? AND status = 'PENDING'`,
      [title, description, complaint_id, citizen_id]
    );

    res.json({ message: 'Complaint updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};

/* =========================
   DELETE MY COMPLAINT
   ========================= */
export const deleteMyComplaint = async (req, res) => {
  const { complaint_id } = req.params;
  const { citizen_id } = req.body;

  try {
    await db.promise().query(
      `DELETE FROM complaints
       WHERE id = ? AND citizen_id = ? AND status = 'PENDING'`,
      [complaint_id, citizen_id]
    );

    res.json({ message: 'Complaint deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Delete failed' });
  }
};

/* =========================
   SEARCH COMPLAINTS ✅ FIXED
   ========================= */
export const searchComplaints = async (req, res) => {
  const { status, category } = req.query;

  let query = `
    SELECT 
      c.id,
      c.complaint_code,
      c.title,
      c.category,
      c.status,
      c.proof,
      c.created_at,

      citizen.name AS citizen_name,
      staff.name AS staff_name

    FROM complaints c

    LEFT JOIN users citizen 
      ON c.citizen_id = citizen.id

    LEFT JOIN users staff 
      ON c.assigned_staff_id = staff.id

    WHERE 1=1
  `;

  const values = [];

  if (status) {
    query += ' AND c.status = ?';
    values.push(status);
  }

  if (category) {
    query += ' AND c.category = ?';
    values.push(category);
  }

  query += ' ORDER BY c.created_at DESC';

  try {
    const [rows] = await db.promise().query(query, values);

    /* ✅ REMARKS FIX */
    for (let complaint of rows) {

      const [remarks] = await db.promise().query(
        `SELECT * FROM remarks
         WHERE complaint_id = ?
         ORDER BY id ASC`,
        [complaint.id]
      );

      complaint.remarks = remarks;
    }

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
};

/* =========================
   ADMIN ASSIGN STAFF
   ========================= */
export const assignComplaint = async (req, res) => {
  const { complaintId } = req.params;
  const { staff_id } = req.body;

  try {
    await db.promise().query(
      `UPDATE complaints
       SET assigned_staff_id = ?, status = 'ASSIGNED'
       WHERE id = ?`,
      [staff_id, complaintId]
    );

    res.json({ message: 'Staff assigned successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Assignment failed' });
  }
};
