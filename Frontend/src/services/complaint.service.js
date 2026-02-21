import api from './api';

// Create complaint (without proof)
export const createComplaint = (data) => {
  return api.post('/complaints/create', data);
};

// Create complaint with proof
export const createComplaintWithProof = (formData) => {
  return api.post('/complaints/create-with-proof', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Get citizen complaints
export const getMyComplaints = (citizenId) => {
  return api.get(`/complaints/my/${citizenId}`);
};
