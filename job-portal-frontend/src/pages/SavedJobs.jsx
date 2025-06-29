import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import JobCard from "../components/job/JobCard";
import { useAuth } from "../hooks/useAuth";
import { getSavedJobs } from "../utils/savedJobs";

export default function SavedJobs() {
  const { role } = useAuth();

  /* 🔒 block admins */
  if (role === "admin") return <Navigate to="/" replace />;

  const [jobs, setJobs] = useState(getSavedJobs());

  useEffect(() => {
    const onStorage = () => setJobs(getSavedJobs());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Jobs
      </Typography>

      {jobs.length === 0 ? (
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
