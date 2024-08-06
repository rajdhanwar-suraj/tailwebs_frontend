// src/services/studentService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/students';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getStudents = async (token) => {
  const response = await axios.get(API_URL, getAuthHeaders(token));
  return response.data;
};

export const getStudentById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders(token));
  return response.data;
};

export const createStudent = async (studentData, token) => {
  const response = await axios.post(API_URL, studentData, getAuthHeaders(token));
  return response.data;
};

export const updateStudent = async (id, studentData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, studentData, getAuthHeaders(token));
  return response.data;
};

export const deleteStudent = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
  return response.data;
};
