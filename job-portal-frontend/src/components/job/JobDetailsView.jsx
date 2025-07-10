// src/components/job/JobDetailsView
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

export default function JobDetailsView({
  job,
  onApply,
  onSave,
  canSave,
  canApply,
  loadingApplied,
  role,
}) {
  if (!job) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5">Job not found</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {job.company} — {job.location}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Salary: {job.minSalary} - {job.maxSalary}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Experience Required: {job.experience}+ Years
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, whiteSpace: "pre-line" }}
      >
        {job.description}
      </Typography>

      {role !== "admin" && (
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          {loadingApplied ? (
            <CircularProgress size={24} />
          ) : canApply ? (
            <Button
              onClick={onApply}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Apply Now
            </Button>
          ) : (
            <Button disabled variant="outlined" fullWidth>
              Already Applied
            </Button>
          )}

          {canSave && (
            <Button variant="outlined" onClick={onSave}>
              Save Job
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
