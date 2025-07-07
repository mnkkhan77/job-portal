// src/api/jobs/applied.jsx
import axios from "../axiosClient";

const BASE = "users/applied";

export const listAppliedJobs = () => axios.get(BASE);
export const applyToJob = (jobId) => axios.post(`${BASE}/${jobId}`);
export const removeApplied = (jobId) => axios.delete(`${BASE}/${jobId}`);
