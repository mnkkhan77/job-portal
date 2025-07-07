import axios from "../axiosClient";

export const changePassword = (oldPassword, newPassword) =>
  axios.put("/users/change-password", { oldPassword, newPassword });
