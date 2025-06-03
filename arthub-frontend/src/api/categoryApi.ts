import { Category, CategoryCreateRequest } from "../types/types";
import API from "./axiosConfig";

export const getCategories = async (): Promise<Category[]> => {
    const response = await API.get<Category[]>("/categories/");

    return response.data;
};

export const getCategoryById = async (categoryId: number): Promise<Category> => {
    const response = await API.get<Category>(`/categories/${categoryId}`);

    return response.data;
};

export const createCategory = async (categoryData: CategoryCreateRequest): Promise<Category> => {
    const response = await API.post<Category>("/admin/categories/", categoryData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const deleteCategoryByAdmin = async (categoryId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/admin/categories/${categoryId}`);

    return response.data;
};
