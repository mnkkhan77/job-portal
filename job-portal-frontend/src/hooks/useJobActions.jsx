import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { applyToJob } from "../utils/appliedJobs";

export const useJobActions = (job) => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return false;
    }
    return true;
  };

  const handleApply = () => {
    if (!requireAuth()) return;
    applyToJob(job);
    alert("Job applied successfully!");
  };

  const handleSave = () => {
    if (!requireAuth()) return;

    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const exists = saved.find((j) => j.id === job.id);

    if (!exists) {
      localStorage.setItem("savedJobs", JSON.stringify([...saved, job]));
      window.dispatchEvent(new Event("storage"));
      alert("Job saved!");
    } else {
      alert("Job already saved.");
    }
  };

  return {
    handleApply,
    handleSave,
    canSave: role !== "admin",
  };
};
