// src/pages/user/profile.jsx
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import useProfile from "./../../hooks/auth/useProfile";

export default function Profile() {
  const {
    form,
    role,
    savedCount,
    appliedCount,
    navigate,
    handleChange,
    handleSave,
  } = useProfile();

  return (
    <Container sx={{ py: 6, display: "flex", justifyContent: "center" }}>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", maxWidth: 450 }}
      >
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Card sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={form.username}
                onChange={handleChange("username")}
              />
              <TextField
                label="Email"
                value={form.email}
                onChange={handleChange("email")}
              />
              <TextField label="Role" value={role} disabled />

              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>

              {role == "user" && (
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Activity
                </Typography>
              )}

              {role !== "admin" && (
                <Typography variant="body2">
                  Saved Jobs: <strong>{savedCount}</strong>
                </Typography>
              )}

              {role == "user" && (
                <Typography variant="body2">
                  Applied Jobs: <strong>{appliedCount}</strong>
                </Typography>
              )}

              <Button component={Link} to="/change-password" variant="outlined">
                Change Password
              </Button>

              {role === "admin" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/admin")}
                >
                  Go to Admin Dashboard
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
