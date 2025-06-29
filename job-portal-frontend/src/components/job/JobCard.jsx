import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSavedJobs } from "../../hooks/useSavedJobs";
import JobCardView from "./JobCardView";

export default function JobCard({ job }) {
  const { isAuthenticated, role } = useAuth();
  const { isSaved, toggleSave } = useSavedJobs();

  const navigate = useNavigate();
  const location = useLocation();

  const saved = isSaved(job.id);
  const canSave = role !== "admin";

  const handleToggle = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    toggleSave(job);
  };

  return (
    <JobCardView
      job={job}
      saved={saved}
      canSave={canSave}
      onToggle={handleToggle}
    />
  );
}
