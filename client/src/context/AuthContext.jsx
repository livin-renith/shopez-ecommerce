import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getProfileApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('shopez_token');
      if (token) {
        try {
          const { data } = await getProfileApi();
          setUser({ ...data, token });
        } catch (error) {
          console.error('Session expired:', error.message);
          localStorage.removeItem('shopez_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginApi(credentials);
    localStorage.setItem('shopez_token', data.token);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const { data } = await registerApi(userData);
    localStorage.setItem('shopez_token', data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('shopez_token');
    setUser(null);
  };

  const updateUserState = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserState, isAdmin: user?.userType === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
