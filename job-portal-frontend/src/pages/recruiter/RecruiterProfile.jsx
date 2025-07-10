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
import useRecruiterProfile from "../../hooks/recruiter/useRecruiterProfile";

export default function RecruiterProfile() {
  const {
    form,
    jobsPosted,
    loading,
    navigate,
    handleChange,
    handleSave,
    handleGoToJobs,
  } = useRecruiterProfile();

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Recruiter Profile
      </Typography>

      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={form.username}
              onChange={handleChange("username")}
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={handleChange("email")}
              fullWidth
            />
            <TextField label="Role" value="recruiter" disabled fullWidth />

            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Posted Jobs: <strong>{jobsPosted}</strong>
            </Typography>

            <Button variant="outlined" onClick={handleGoToJobs}>
              Manage Posted Jobs
            </Button>

            <Button component={Link} to="/change-password" variant="text">
              Change Password
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
