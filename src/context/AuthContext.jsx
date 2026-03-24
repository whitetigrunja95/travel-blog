import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api/authApi";
import { getCurrentUser } from "../api/userApi";
import { apiClient } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete apiClient.defaults.headers.Authorization;
    }
  };

  const loadUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
      setAuthToken(null);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthChecked(true);
        return;
      }

      setAuthToken(token);

      try {
        await loadUser();
      } catch (error) {
        console.error("Не удалось загрузить пользователя:", error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    initAuth();
  }, []);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      setAuthToken(response.token);
      await loadUser();
    } catch (error) {
      console.error("Ошибка входа:", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (data) => {
    const response = await registerUser(data);
    setAuthToken(response.token);
    await loadUser();
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Ошибка выхода:", error);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAuthChecked,
      login,
      register,
      logout,
      loadUser,
    }),
    [user, isAuthChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);