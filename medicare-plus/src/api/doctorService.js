import api from './axios';

export const getAllDoctors = async (params = {}) => {
  const response = await api.get('/doctors', { params });
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};
