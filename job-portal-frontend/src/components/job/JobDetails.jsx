import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jobsData from "../../data/jobs.json";
import { useAuth } from "../../hooks/useAuth";
import { applyToJob } from "../../utils/appliedJobs";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === parseInt(id, 10));

  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------- handlers ---------- */
  const handleApply = () => {
    // gate: redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    applyToJob(job);
    alert("Job applied successfully!");
  };

  const handleSaveJob = () => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const exists = saved.find((j) => j.id === job.id);

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!exists) {
      localStorage.setItem("savedJobs", JSON.stringify([...saved, job]));
      window.dispatchEvent(new Event("storage"));
      alert("Job saved!");
    } else {
      alert("Job already saved.");
    }
  };

  /* ---------- UI ---------- */
  if (!job) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5">Job not found</Typography>
        <Button onClick={() => navigate(-1)} variant="contained" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

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
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleApply}
        >
          Apply Now
        </Button>

        {role !== "admin" && (
          <Button variant="outlined" onClick={handleSaveJob}>
            Save Job
          </Button>
        )}
      </Stack>
    </Box>
  );
}
