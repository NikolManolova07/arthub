import { Comment, Post, PostCreateRequest, PostDetails } from "../types/types";
import API from "./axiosConfig";

export const createPost = async (postData: PostCreateRequest): Promise<PostDetails> => {
    const formData = new FormData();
    formData.append("categoryId", postData.categoryId.toString());
    formData.append("postContent", postData.postContent);

    if (postData.image) {
        formData.append("image", postData.image);
    }

    const response = await API.post<PostDetails>("/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
};

export const getPosts = async (): Promise<PostDetails[]> => {
    const response = await API.get<PostDetails[]>("/posts/");
    
    return response.data;
};

export const getPostById = async (postId: number): Promise<PostDetails> => {
    const response = await API.get<PostDetails>(`/posts/${postId}`);

    return response.data;
};

export const deletePost = async (postId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/posts/${postId}`);

    return response.data;
};

export const likePost = async (postId: number): Promise<Map<string, string>> => {
    const response = await API.post<Map<string, string>>(`/posts/${postId}/like`);

    return response.data;
};

export const unlikePost = async (postId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/posts/${postId}/unlike`);

    return response.data;
};

export const createComment = async (postId: number, commentData: { comment: string }): Promise<Comment> => {
    const response = await API.post<Comment>(`/posts/${postId}/comments/`, commentData, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};

export const deleteComment = async (postId: number, commentId: number): Promise<Map<string, string>> => {
    const response = await API.delete(`/posts/${postId}/comments/${commentId}`);

    return response.data;
};

export const getPostsByCategory = async (categoryId: number): Promise<PostDetails[]> => {
    const response = await API.get<PostDetails[]>(`/posts/categories/${categoryId}`);

    return response.data;
};

export const getPostsByAdmin = async (): Promise<Post[]> => {
    const response = await API.get<Post[]>("/admin/posts/");

    return response.data;
};

export const deletePostByAdmin = async (postId: number): Promise<Map<string, string>> => {
    const response = await API.delete<Map<string, string>>(`/admin/posts/${postId}`);

    return response.data;
};
