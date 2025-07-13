import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * Pure presentational job card.
 * Props:
 *  - job        { id,title,company,experience,location,minSalary, maxSalary }
 *  - saved      boolean
 *  - canSave    boolean  (show bookmark if true)
 *  - onToggle   function () => void
 */
export default function JobCardView({ job, saved, canSave, onToggle }) {
  const formatSalary = (salary) => {
    if (salary >= 100000) {
      return `₹ ${(salary / 100000).toFixed(2)} LPA`;
    } else if (salary >= 1000) {
      return `₹ ${(salary / 1000).toFixed(0)} TPA`;
    } else {
      return `₹ ${salary}`;
    }
  };
  return (
    <Card
      sx={{
        position: "relative",
        width: 300,
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      {/* bookmark */}
      {canSave && (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <Tooltip title={saved ? "Unsave Job" : "Save Job"}>
            <IconButton size="small" onClick={onToggle} color="primary">
              {saved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <CardContent>
        <Typography
          variant="h6"
          component={RouterLink}
          to={`/job/${job.id}`}
          sx={{
            textDecoration: "underline",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          {job.title}
        </Typography>

        <Box mt={1}>
          <Typography variant="body2">
            <strong>Company:</strong> {job.company}
          </Typography>
          <Typography variant="body2">
            <strong>Experience:</strong> {job.experience}+ Years
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong> {job.location}
          </Typography>
          <Typography variant="body2">
            <strong>Salary:</strong>{" "}
            {job.minSalary && job.maxSalary
              ? `${formatSalary(job.minSalary)} - ${formatSalary(
                  job.maxSalary
                )}`
              : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          component={RouterLink}
          to={`/job/${job.id}`}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
