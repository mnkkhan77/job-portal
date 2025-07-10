import { useLocation, useNavigate } from "react-router-dom";
import { toggleSaveJob } from "../../api/jobs/actions";
import { useJobState } from "../../contexts/JobStateProvider";
import { useAuth } from "./../../hooks/auth/useAuth";
import JobCardView from "./JobCardView";

export default function JobCard({ job }) {
  const { isAuthenticated, role } = useAuth();
  const { savedJobs, refreshSaved } = useJobState();
  const navigate = useNavigate();
  const location = useLocation();

  const isSaved = savedJobs.some((j) => j.id === job.id);
  const canSave = isAuthenticated && role !== "admin" && role !== "recruiter";

  const handleToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    await toggleSaveJob(job.id, isSaved);
    await refreshSaved();
  };

  return (
    <JobCardView
      job={job}
      saved={isSaved}
      canSave={canSave}
      onToggle={handleToggle}
    />
  );
}
