import axios from "../axiosClient";

// You can update these endpoints if needed
export const getRecruiterProfile = () => axios.get("/recruiter/profile");
export const updateRecruiterProfile = (payload) =>
  axios.put("/recruiter/profile", payload);

export const getRecruiterJobs = () => axios.get("/recruiter/jobs");
