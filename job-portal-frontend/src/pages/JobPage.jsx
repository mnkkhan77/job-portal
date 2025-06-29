import { Box, CssBaseline } from "@mui/material";
import JobDetail from "../components/JobDetails";

const sampleJob = {
  title: "Senior Software Engineer",
  location: "Remote, Global",
  salary: "$80k - $120k",
  description: "We are looking for a Senior Software Engineer...",
  applyLink: "https://apply.jobportal.com/12345",
};

export default function JobPage() {
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <JobDetail job={sampleJob} />
      </Box>
    </div>
  );
}
