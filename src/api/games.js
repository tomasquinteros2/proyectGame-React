import axios from "./axios";

export const getGamesRequest = async () => axios.get("/games");



export const updateTaskRequest = async (task) => axios.put(`/games/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/games/${id}`);

//export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
