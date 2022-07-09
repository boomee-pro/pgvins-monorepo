import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  axios.defaults.baseURL = "http://localhost:8080/";
  const [user, setUser] = useState({
    isAuthenticated: false,
    details: {},
  });
  const [loading, setLoading] = useState(true);

  const register = (credentials) => {
    return axios
      .post("auth/register", credentials, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data) {
          setUser({
            isAuthenticated: true,
            details: res.data.data,
          });
        }
      });
  };

  const login = (credentials) => {
    return axios
      .post("auth/login", credentials, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data) {
          setUser({
            isAuthenticated: true,
            details: res.data.data,
          });
        }
      });
  };

  const logout = async () => {
    await axios.get("auth/logout", { withCredentials: true }).then(() => {
      setUser({
        isAuthenticated: false,
        details: {},
      });
    });
  };

  useEffect(() => {
    const reconectUser = async () => {
      await axios
        .get("auth/user", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.data)
            setUser({
              isAuthenticated: true,
              details: res.data.data,
            });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    reconectUser();
  }, []);

  const value = {
    user,
    loading,
    connected: user.isAuthenticated,
    logout,
    register,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
