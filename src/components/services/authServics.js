import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

const register = async (name, email, password) => {
  try {
    console.log(name, email, password);
    
    const response = await axios.post(API_URL + 'register', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : 'Registration failed');
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
