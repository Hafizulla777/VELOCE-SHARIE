import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => { 
  const context = useContext(AuthContext); 
  if (!context) throw new Error('useAuth must be used within AuthProvider'); 
  return context; 
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('veloceUser');
    if (storedUser) { 
      try { 
        setUser(JSON.parse(storedUser)); 
      } catch { 
        localStorage.removeItem('veloceUser'); 
      } 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const userData = data?.data?.user || data?.user || data;
    const tokenData = data?.data?.token || data?.token;
    
    localStorage.setItem('veloceUser', JSON.stringify(userData));
    localStorage.setItem('veloceToken', tokenData);
    setUser(userData); 
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`; 
    return data;
  };

  const register = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', { name, email, password, role });
    const userData = data?.data?.user || data?.user || data;
    const tokenData = data?.data?.token || data?.token;

    localStorage.setItem('veloceUser', JSON.stringify(userData));
    localStorage.setItem('veloceToken', tokenData);
    setUser(userData); 
    api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`; 
    return data;
  };

  const logout = () => { 
    localStorage.removeItem('veloceUser'); 
    localStorage.removeItem('veloceToken'); 
    delete api.defaults.headers.common['Authorization']; 
    setUser(null); 
  };

  // BULLETPROOF UPDATE: Safely merges data without breaking the app
  const updateUser = (updatedData) => { 
    if (!updatedData) return;
    
    const merged = { ...user, ...updatedData }; 
    
    // Ensure we only save clean user data to localStorage
    const cleanData = {
      _id: merged._id,
      name: merged.name,
      email: merged.email,
      phone: merged.phone,
      role: merged.role,
      createdAt: merged.createdAt
    };

    localStorage.setItem('veloceUser', JSON.stringify(cleanData)); 
    setUser({ ...user, ...updatedData }); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;