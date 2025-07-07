// src/api/jobs/saved
import axios from "../axiosClient";

const BASE = "users/saved";

export const listSavedJobs = () => axios.get(BASE);
export const saveJob = (jobId) => axios.post(`${BASE}/${jobId}`);
export const unsaveJob = (jobId) => axios.delete(`${BASE}/${jobId}`);
