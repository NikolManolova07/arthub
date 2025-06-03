import axios from "axios";
import { BASE_URL } from "./constants";

const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
