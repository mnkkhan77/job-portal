import axios from "../axiosClient";

export const listMyJobs = () => axios.get("/recruiter/jobs");
export const createMyJob = (payload) => axios.post("/recruiter/jobs", payload);
export const updateMyJob = (id, p) => axios.put(`/recruiter/jobs/${id}`, p);
export const deleteMyJob = (id) => axios.delete(`/recruiter/jobs/${id}`);
