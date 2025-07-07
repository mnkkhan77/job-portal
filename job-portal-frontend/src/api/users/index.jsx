// src/api/users/index.jsx
import axios from "../axiosClient";

/* List all users — if accessible to non-admins */
export const fetchUsers = () => axios.get("/users").then((res) => res.data);

/* Create a user — usually via /auth/register */
export const createUser = (user) =>
  axios.post("/users", user).then((res) => res.data);

/* Update a user */
export const updateUser = (id, user) =>
  axios.put(`/users/${id}`, user).then((res) => res.data);

/* Delete a user */
export const deleteUser = (id) => axios.delete(`/users/${id}`);
