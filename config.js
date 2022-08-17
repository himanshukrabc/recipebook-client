import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://hkbapi.herokuapp.com/api"
});