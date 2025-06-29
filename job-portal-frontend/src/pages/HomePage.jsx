import { Box, CssBaseline } from "@mui/material";
import JobsList from "./JobsList";

export default function HomePage() {
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
        <JobsList />
      </Box>
    </div>
  );
}
