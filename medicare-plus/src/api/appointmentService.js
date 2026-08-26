import api from './axios';

export const bookAppointment = async (data) => {
  const response = await api.post('/appointments', data);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get('/appointments/my');
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.put(`/appointments/${id}/cancel`);
  return response.data;
};

export const getBookedSlots = async (doctorId, date) => {
  const response = await api.get('/appointments/slots', {
    params: { doctorId, date },
  });
  return response.data;
};
