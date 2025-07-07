import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useAdminMetrics from "./../../hooks/admin/useAdminMetrics";

const StatCard = ({ label, value }) => (
  <Card
    sx={{
      width: 200,
      minHeight: 120,
      textAlign: "center",
      bgcolor: "background.paper",
    }}
    elevation={3}
  >
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default function AdminHome() {
  const theme = useTheme();
  const { jobCount, userCount, loading } = useAdminMetrics();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ color: theme.palette.text.primary }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <StatCard label="Total Jobs" value={jobCount} />
        <StatCard label="Total Users" value={userCount} />
      </Stack>
    </Box>
  );
}
