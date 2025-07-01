import { FormLoginRequest, FormRegisterRequest, LoginResponse, LogoutResponse, User } from "../types/types";
import API from "./axiosConfig";

export const register = async (userData: FormRegisterRequest): Promise<User> => {
    const response = await API.post<User>("/auth/register", userData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const login = async (userData: FormLoginRequest): Promise<LoginResponse> => {
    const response = await API.post<LoginResponse>("/auth/login", userData, {
        headers: { "Content-Type": "application/json" }
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.id.toString());
    localStorage.setItem("role", response.data.role);

    return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
    const response = await API.post<LogoutResponse>("/auth/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    return response.data;
};

export const getMe = async (): Promise<User> => {
    const response = await API.get<User>("/auth/me");

    return response.data;
};
