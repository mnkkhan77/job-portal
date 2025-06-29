// File: src/pages/AppliedJobs.jsx

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import JobCard from "../components/job/JobCard";
import { getAppliedJobs } from "../utils/appliedJobs";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState(getAppliedJobs());

  useEffect(() => {
    const onStorage = () => setJobs(getAppliedJobs());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Applied Jobs
      </Typography>

      {jobs.length === 0 ? (
        <Typography>You haven&rsquo;t applied to any jobs yet.</Typography>
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
