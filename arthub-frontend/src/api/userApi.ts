import { Leaderboard, User, UserDetails, UserUpdateRequest } from "../types/types";
import API from "./axiosConfig";

export const getUserById = async (userId: number): Promise<UserDetails> => {
    const response = await API.get<UserDetails>(`/users/${userId}`);

    return response.data;
};

export const updateUser = async (userId: number, userData: UserUpdateRequest): Promise<User> => {
    const formData = new FormData();

    if (userData.firstName) {
        formData.append("firstName", userData.firstName);
    }

    if (userData.lastName) {
        formData.append("lastName", userData.lastName);
    }

    if (userData.email) {
        formData.append("email", userData.email);
    }

    if (userData.image) {
        formData.append("image", userData.image);
    }

    const response = await API.put<User>(`/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
};

export const followUser = async (userId: number): Promise<Map<string, string>> => {
    const response = await API.post<Map<string, string>>(`/users/${userId}/follow`);

    return response.data;
};

export const unfollowUser = async (userId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/users/${userId}/unfollow`);

    return response.data;
};

export const getUserFollowers = async (userId: number): Promise<User[]> => {
    const response = await API.get<User[]>(`/users/${userId}/followers`);

    return response.data;
};

export const getUserFollowing = async (userId: number): Promise<User[]> => {
    const response = await API.get<User[]>(`/users/${userId}/following`);

    return response.data;
};

export const getLeaderboard = async (): Promise<Leaderboard[]> => {
    const response = await API.get<Leaderboard[]>("users/leaderboard");

    return response.data;
};

export const searchUsers = async (keyword: string): Promise<User[]> => {
    const response = await API.get<User[]>("/users/search", {
        params: { keyword },
    });

    return response.data;
};

export const getUsersByAdmin = async (): Promise<User[]> => {
    const response = await API.get<User[]>("/admin/users/");

    return response.data;
};

export const deleteUserByAdmin = async (userId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/admin/users/${userId}`);

    return response.data;
};

export const promoteUser = async (userId: number): Promise<Map<string, string>> => {
    const response = await API.put<Map<string, string>>(`/admin/users/${userId}/promote`);

    return response.data;
};
