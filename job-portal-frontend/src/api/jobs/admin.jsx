import axios from "../axiosClient";

export const listAdminJobs = () => axios.get("/admin/jobs");
export const createAdminJob = (payload) => axios.post("/admin/jobs", payload);
export const updateAdminJob = (id, payload) =>
  axios.put(`/admin/jobs/${id}`, payload);
export const deleteAdminJob = (id) => axios.delete(`/admin/jobs/${id}`);
