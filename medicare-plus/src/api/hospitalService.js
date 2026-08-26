import api from './axios';

export const getAllHospitals = async (params = {}) => {
  const response = await api.get('/hospitals', { params });
  return response.data;
};

export const getHospitalById = async (id) => {
  const response = await api.get(`/hospitals/${id}`);
  return response.data;
};
