// src/components/job/JobDetails.jsx
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import useJob from "../../hooks/jobs/useJob";
import { useJobActions } from "../../hooks/jobs/useJobActions";
import BreadcrumbsNav from "./../common/BreadcrumbsNav";
import JobDetailsView from "./JobDetailsView";

export default function JobDetails() {
  const { id } = useParams();
  const { data: job, loading } = useJob(id);
  const navigate = useNavigate();

  const { role } = useAuth();
  const {
    handleApply,
    handleSave,
    canSave,
    isSaved,
    canApply,
    loadingApplied,
  } = useJobActions(job || {});

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
    <>
      <BreadcrumbsNav path={["Home", "Job Details"]} />
      <JobDetailsView
        job={job}
        onApply={handleApply}
        onSave={handleSave}
        isSaved={isSaved}
        canApply={canApply}
        canSave={canSave}
        loadingApplied={loadingApplied}
        role={role}
      />
    </>
  );
}
