// src/components/job/JobDetails.jsx
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import useJob from "../../hooks/jobs/useJob";
import { useJobActions } from "../../hooks/jobs/useJobActions";

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
    <Box
      sx={{
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {job.company} — {job.location}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Salary: {job.salary}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Experience Required: {job.experience}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, whiteSpace: "pre-line" }}
      >
        {job.description}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        {/* Only show if not admin */}
        {role !== "admin" && (
          <>
            {loadingApplied ? (
              <CircularProgress size={24} />
            ) : canApply ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleApply}
              >
                Apply Now
              </Button>
            ) : (
              <Button disabled variant="outlined" fullWidth>
                Already Applied
              </Button>
            )}

            {canSave && (
              <Button variant="outlined" onClick={handleSave}>
                Save Job
              </Button>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
