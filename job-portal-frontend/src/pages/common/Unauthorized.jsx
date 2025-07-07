import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h2" color="primary">
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        You don’t have permission to view this page.
      </Typography>

      <Button variant="contained" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Button sx={{ mt: 1 }} onClick={() => navigate("/login")}>
        Login as different user
      </Button>
    </Box>
  );
}
