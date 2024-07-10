import axios from "./axios";
import { API } from "../config";

export const registerRequest = user => axios.post(API+`/users/register`,user)

export const loginRequest = user => axios.post(API+`/users/login`,user)

export const logoutRequest = user => axios.post(API+`/users/logout`,user)

export const verifyTokenRequest = async (token) => {
    try {
        console.log(token)
        const response = await axios.get(`${API}/users/verify`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

