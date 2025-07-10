// src/pages/jobs/AppliedJobs.jsx
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { listAppliedJobs, removeApplied } from "../../api/jobs/applied";
import JobCard from "../../components/job/JobCard";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const response = await listAppliedJobs();
      setJobs(response.data ?? []);
    } catch (err) {
      // console.error("Failed to fetch applied jobs", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeApplied(id);
      fetchAppliedJobs();
    } catch (err) {
      // console.error("Failed to remove job", err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Applied Jobs
      </Typography>

      {loading ? (
        // <Typography>Loading...</Typography>
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography>You haven't applied to any jobs yet.</Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          {jobs.map((job) => (
            <Box key={job.id} position="relative">
              <JobCard job={job} />
              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => handleRemove(job.id)}
                sx={{ mt: 1 }}
                fullWidth
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
