import axios from "axios"

export const customAxios = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:4000/api" :"/api",
    withCredentials:true
});