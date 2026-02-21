import db from '../config/db.js';

export const addRemarkAndUpdateStatus = async (req, res) => {

  const {
    complaint_id,
    staff_id,
    message,
    status,
    status_at_time   
  } = req.body;

  const finalStatus = status || status_at_time;

  try {

    if (!complaint_id || !staff_id || !finalStatus) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }
    /* ✅ CHECK COMPLAINT OWNERSHIP */
const [rows] = await db.promise().query(
  'SELECT assigned_staff_id FROM complaints WHERE id = ?',
  [complaint_id]
);

if (!rows.length) {
  return res.status(404).json({
    message: 'Complaint not found'
  });
}

const assignedStaffId = rows[0].assigned_staff_id;

/*  BLOCK OTHER STAFF */
if (assignedStaffId && assignedStaffId !== staff_id) {
  return res.status(403).json({
    message: 'You are not assigned to this complaint'
  });
}

    await db.promise().query(
      'UPDATE complaints SET status = ?, assigned_staff_id = ? WHERE id = ?',
      [finalStatus, staff_id, complaint_id]
    );

    await db.promise().query(
      `INSERT INTO remarks
       (complaint_id, staff_id, message, status_at_time)
       VALUES (?, ?, ?, ?)`,
      [complaint_id, staff_id, message, finalStatus]
    );

    res.json({ message: 'Status updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
};
