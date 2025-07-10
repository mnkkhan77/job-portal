// src/components/job/JobDetails.jsx
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import useJob from "../../hooks/jobs/useJob";
import { useJobActions } from "../../hooks/jobs/useJobActions";
import JobDetailsView from "./JobDetailsView";

export default function JobDetails() {
  const { id } = useParams();
  const { job, loading } = useJob(id);
  const navigate = useNavigate();

  const { role } = useAuth(); // ✅ Add this line
  const { handleApply, handleSave, canSave, canApply, loadingApplied } =
    useJobActions(job || {});

  // Loading the job itself
  if (loading)
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress />
      </Box>
    );

  if (!job)
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5">Job not found</Typography>
        <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );

  return (
    <JobDetailsView
      job={job}
      onApply={handleApply}
      onSave={handleSave}
      canApply={canApply}
      canSave={canSave}
      loadingApplied={loadingApplied}
      role={role}
    />
  );
}
