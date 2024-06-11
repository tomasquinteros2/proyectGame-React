import axios from "./axios";

const API = 'https://react-api-fdr8.onrender.com'
export const registerRequest = user => axios.post(`/users/register`,user)

export const loginRequest = user => axios.post(`/users/login`,user)

export const logoutRequest = user => axios.post(`/users/logout`,user)

export const verifyTokenRequest = async () => axios.get(`/users/verify`);

