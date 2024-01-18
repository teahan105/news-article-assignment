import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9000/api",
    timeout: 1000 * 60, // 1 minute
});
api.interceptors.response.use((response) => {
    return response.data;
});
