import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

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
        <StatCard label="Total Jobs" value={24} />
        <StatCard label="Total Users" value={87} />
        <StatCard label="Applications" value={142} />
      </Stack>
    </Box>
  );
}
