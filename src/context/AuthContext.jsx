import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api/authApi";
import { getCurrentUser } from "../api/userApi";
import { setClientToken } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      setClientToken(token);
    } else {
      localStorage.removeItem("token");
      setClientToken(null);
    }
  };

  const loadUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return userData;
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
    const response = await loginUser(data);
    setAuthToken(response.token);
    await loadUser();
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
      setUser,
      loadUser,
      isAuthenticated: Boolean(user),
      isAuthChecked,
      login,
      register,
      logout,
    }),
    [user, isAuthChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);