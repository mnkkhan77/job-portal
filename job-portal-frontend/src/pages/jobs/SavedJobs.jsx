// src/pages/SavedJobs.jsx
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import JobCard from "../../components/job/JobCard";
import { useAuth } from "../../hooks/auth/useAuth";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";
import useSavedJobs from "./../../hooks/jobs/useSavedJobs";

export default function SavedJobs() {
  const { role } = useAuth();
  if (role === "admin") return <Navigate to="/" replace />; // 🔒 block admins

  const { savedJobs: jobs, loading } = useSavedJobs();

  return (
    <Container sx={{ py: 4 }}>
      <BreadcrumbsNav path={["Home", "Saved Jobs"]} />
      <Typography variant="h4" gutterBottom>
        Saved Jobs
      </Typography>

      {loading ? (
        <Box textAlign="center" py={4}>
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Typography>You haven&rsquo;t saved any jobs yet.</Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Box>
      )}
    </Container>
  );
}
