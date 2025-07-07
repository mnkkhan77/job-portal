import axios from "../axiosClient";

export const getProfile = () => axios.get("/users/me");
export const updateProfile = (payload = {}) => axios.put("/users/me", payload);
