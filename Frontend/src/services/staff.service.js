import api from './api';

// Staff: get all complaints
export const getAllComplaints = () => {
  return api.get('/complaints/all');
};

// Staff: add remark + update status
export const addRemark = (data) => {
  return api.post('/remarks/add', data);
};
