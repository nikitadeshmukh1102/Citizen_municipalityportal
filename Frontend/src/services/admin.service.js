import api from './api';

/* ADMIN → GET ALL COMPLAINTS */
export const getAllComplaintsAdmin = () => {
  return api.get('/complaints/all');
};

/* ADMIN → GET STAFF LIST */
export const getStaffList = () => {
  return api.get('/admin/staff');
};
export const updateComplaintStatus = (id, status) => {
  return api.put(`/complaints/status/${id}`, { status });
};


/* ADMIN → ASSIGN STAFF */
export const assignComplaint = (complaintId, staffId) => {
  return api.put(`/admin/assign/${complaintId}`, {
    staff_id: staffId
  });
};
