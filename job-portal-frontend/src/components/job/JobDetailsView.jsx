import { Box, Button, Stack, Typography } from "@mui/material";

export default function JobDetailsView({ job, onApply, onSave, canSave }) {
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
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onApply}
        >
          Apply Now
        </Button>
        {canSave && (
          <Button variant="outlined" onClick={onSave}>
            Save Job
          </Button>
        )}
      </Stack>
    </Box>
  );
}
