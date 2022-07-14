import { createContext, useContext, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginInput } from "pages/login";
import { RegisterInput } from "pages/register";

type User = {
  isAuthenticated: boolean;
  details: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

type authContextReturningValues = {
  user: User;
  login: (credentials: LoginInput) => Promise<User | void>;
  logout: () => Promise<void>;
  fetchUser: () => void;
  connected: boolean;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/auth",
  withCredentials: true,
  timeout: 15000,
});

const responseUser = (response: AxiosResponse) => {
  if (response.data.data)
    return { isAuthenticated: true, details: response.data.data };
  return { isAuthenticated: false, details: {} };
};

const userRequests = {
  get: (url: string, options?: AxiosRequestConfig) =>
    axiosInstance.get<User>(url, options).then(responseUser),
  post: (url: string, body: LoginInput | RegisterInput) =>
    axiosInstance.post<User>(url, body).then(responseUser),
};

const AuthContext = createContext({} as authContextReturningValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const getUser = async (ctx: any) => {
  return await userRequests
    .get("/user", {
      headers: ctx?.req?.headers?.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined,
    })
    .then((user) => {
      return user;
    });
};

export function AuthProvider({ children, userData }: any) {
  const [user, setUser] = useState(
    userData ||
      ({
        isAuthenticated: false,
        details: {},
      } as User)
  );

  const fetchUser = async () => {
    await userRequests.get("/user").then((user) => {
      setUser(user);
    });
  };

  const login = (credentials: LoginInput): Promise<void | User> => {
    return userRequests
      .post("/login", credentials)
      .then((userData) => setUser(userData ?? ({} as User)));
  };

  const logout = async () => {
    await userRequests.get("/logout").then((user) => setUser(user));
  };

  const value: authContextReturningValues = {
    user,
    connected: user.isAuthenticated && user.details,
    login,
    logout,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
