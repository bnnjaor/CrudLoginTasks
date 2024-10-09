import axios from "./axios";
const API = "http://localhost:3000/api";

export const registerRequest = (user) => axios.post(`/auth/register`, user);

export const loginRequest = (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = () => axios.get(`/auth/verify`);


