import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../components/services/authServics';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return authService.getCurrentUser();
  });

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      console.log("User logged in:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle the error accordingly, e.g., show a notification to the user
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
