// src/components/job/JobDetailsView
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function JobDetailsView({
  job,
  onApply,
  onSave,
  isSaved,
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
  const formatSalary = (salary) => {
    if (salary >= 100000) {
      return `₹ ${(salary / 100000).toFixed(2)} LPA`;
    } else if (salary >= 1000) {
      return `₹ ${(salary / 1000).toFixed(0)} TPA`;
    } else {
      return `₹ ${salary}`;
    }
  };
  const theme = useTheme();
  const link = job.jobLink ? job.jobLink : "http://www.example.com";

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, maxWidth: 900, mx: "auto" }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          border: (theme) =>
            theme.palette.mode === "light"
              ? "1px solid #e0e0e0"
              : "1px solid #333",
        }}
      >
        {/* Job Title & Company */}
        <Typography
          variant="h4"
          align="center"
          fontWeight={900}
          gutterBottom
          sx={{
            letterSpacing: 0.5,
            textDecoration: "underline",
            color: theme.palette.mode === "light" ? "#3b2d2d" : undefined,
          }}
        >
          {job.title}
        </Typography>

        <Typography
          variant="h6"
          color="text.primary"
          sx={{ textTransform: "uppercase", letterSpacing: 1, mb: 2 }}
        >
          {job.company} • {job.location}
        </Typography>

        {/* Key Details */}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={4}
          // alignItems="center"
          alignItems={{ xs: "flex-start", lg: "center" }}
          flexWrap="wrap"
          mt={2}
          mb={3}
        >
          <Typography variant="body1" color="text.primary">
            <WorkOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />{" "}
            <strong>Experience:</strong> {job.experience}+ Years
          </Typography>
          <Typography variant="body1" color="text.primary">
            <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} />{" "}
            <strong>Salary:</strong> {formatSalary(job.minSalary)} -{" "}
            {formatSalary(job.maxSalary)}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />{" "}
            <strong>Location:</strong> {job.location}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.8,
            fontSize: "1rem",
            mt: 3,
          }}
        >
          {job.description}
        </Typography>

        {/* Action Buttons */}
        {role !== "admin" && role !== "recruiter" && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 5 }}
          >
            {loadingApplied ? (
              <CircularProgress size={24} />
            ) : canApply ? (
              <Button
                component="a"
                onClick={onApply}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ fontWeight: 600 }}
              >
                Apply Now
              </Button>
            ) : (
              <Button disabled variant="outlined" fullWidth>
                Already Applied
              </Button>
            )}

            {canSave && (
              <Button variant="outlined" onClick={onSave} fullWidth>
                {isSaved ? "Unsave Job" : "Save Job"}
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
