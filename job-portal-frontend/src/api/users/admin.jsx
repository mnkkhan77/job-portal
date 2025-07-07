// src/api/users/admin.jsx
import axios from "../axiosClient";

// Admin Users
export const listAdminUsers = () => axios.get("/admin/users");
export const createAdminUser = (payload) => axios.post("/admin/users", payload);
export const updateAdminUser = (id, payload) =>
  axios.put(`/admin/users/${id}`, payload);
export const deleteAdminUser = (id) => axios.delete(`/admin/users/${id}`);

// Admin Jobs
export const listAdminJobs = () => axios.get("/admin/jobs");

// ✅ Admin Metrics (at-a-glance cards)
export const getAdminMetrics = async () => {
  try {
    const [jobsRes, usersRes] = await Promise.all([
      axios.get("/admin/jobs"),
      axios.get("/admin/users"),
    ]);

    return {
      jobCount: jobsRes.data.length,
      userCount: usersRes.data.length,
    };
  } catch (err) {
    console.error("Failed to load admin metrics", err);
    return { jobCount: 0, userCount: 0 }; // fallback
  }
};
