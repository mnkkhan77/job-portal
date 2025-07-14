// File: src/pages/Careers.jsx
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";

const Careers = () => {
  return (
    <>
      <BreadcrumbsNav path={["Home", "Careers"]} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Careers
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            Join our mission to build the best job search platform on the web.
            We're always looking for passionate, curious, and talented
            individuals who want to make an impact.
          </Typography>

          <Typography variant="h6" sx={{ mt: 4 }}>
            Current Openings:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Frontend Developer (React.js)"
                secondary="Remote | Full-time"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Java Backend Developer (Spring Boot)"
                secondary="Bangalore | Hybrid"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="UI/UX Designer"
                secondary="Remote | Contract"
              />
            </ListItem>
          </List>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't see a role that fits? Reach out at{" "}
            <strong>careers@jobportal.com</strong> — we’re always open to
            amazing talent.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Careers;
