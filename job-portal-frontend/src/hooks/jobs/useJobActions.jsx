import { useLocation, useNavigate } from "react-router-dom";
import { applyToJob as apiApply, toggleSaveJob } from "../../api/jobs/actions";
import { useJobState } from "../../contexts/JobStateProvider";
import { useAuth } from "../auth/useAuth";

export const useJobActions = (job) => {
  const { isAuthenticated, role, username } = useAuth();
  const { appliedJobs, savedJobs, refreshApplied, refreshSaved } =
    useJobState();

  const navigate = useNavigate();
  const location = useLocation();

  const isSaved = savedJobs.some((j) => j.id === job?.id);
  const isApplied = appliedJobs.some((j) => j.id === job?.id);

  // Check if recruiter is the one who posted the job
  const isOwner = role === "recruiter" && job?.postedBy === username;

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return false;
    }
    return true;
  };

  const handleApply = async () => {
    if (!requireAuth()) return;
    try {
      await apiApply(job.id);
      await refreshApplied();
      alert("Applied successfully!");
    } catch (err) {
      console.error("Error in handleApply:", err);
      alert("Failed to apply.");
    }
  };

  const handleSave = async () => {
    if (!requireAuth()) return;
    try {
      await toggleSaveJob(job.id, isSaved);
      await refreshSaved();
      alert(isSaved ? "Removed from saved jobs." : "Job saved!");
    } catch {
      alert("Error saving job.");
    }
  };

  return {
    handleApply,
    handleSave,
    isSaved,
    canApply: !isApplied && role !== "admin" && !isOwner,
    canSave: role !== "admin" && !isOwner,
  };
};
