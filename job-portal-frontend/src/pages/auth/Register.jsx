// src/pages/Register.jsx

import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../api/auth";
import { saveAuth } from "../../utils/authStorage";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Username is required";
    else if (name.length < 3) {
      newErrors.name = "Username is too short";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!role) newErrors.role = "Role is required";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setError("");

    if (!validate()) return;

    try {
      const res = await register({
        username: name,
        email,
        password,
        role,
      });

      const { token, user } = res.data;
      saveAuth(token, user);

      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed, try again.";
      setError(msg);
    }
  };

  return (
    <>
      <BreadcrumbsNav path={["Home", "Register"]} />
      <Box display="flex" justifyContent="center" mt={8}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
          />

          <TextField
            select
            fullWidth
            label="Role"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            error={!!formErrors.role}
            helperText={formErrors.role}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
          </TextField>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </>
  );
}
