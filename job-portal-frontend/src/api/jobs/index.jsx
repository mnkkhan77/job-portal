import axios from "../axiosClient";

export const listJobs = (params = {}) => axios.get("/jobs", { params });
export const getJob = (id) => axios.get(`/jobs/${id}`);
