import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://recipebook-service.onrender.com/api/"
});