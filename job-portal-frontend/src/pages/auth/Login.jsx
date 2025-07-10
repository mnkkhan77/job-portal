// src/pages/auth/Login
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { login as loginApi } from "../../api/auth";
import { saveAuth } from "../../utils/authStorage";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/profile";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username & password required");
      return;
    }

    try {
      const { data } = await loginApi({ username, password });
      const { token, user } = data;

      saveAuth(token, user);
      if (user.role === "recruiter") {
        navigate("/recruiter/jobs", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed. Please check credentials.";
      setError(msg);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Tip: <strong>admin</strong> logs in as admin role.
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
