import { Box, Typography } from "@mui/material";
import JobCard from "../JobCard";

const JobList = ({ jobs }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Featured Jobs
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          mt: 2,
        }}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Box>
    </Box>
  );
};

export default JobList;
