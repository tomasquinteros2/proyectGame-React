import axios from "./axios";
import { API } from "../config";

export const registerRequest = user => axios.post(API+`/users/register`,user)

export const loginRequest = user => axios.post(API+`/users/login`,user)

export const logoutRequest = user => axios.post(API+`/users/logout`,user)

export const verifyTokenRequest = async () => axios.get(API+`/users/verify`);

