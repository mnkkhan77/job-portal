// File: src/pages/About.jsx
import { Box, Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" paragraph>
          JobPortal is a modern platform built to bridge the gap between job
          seekers and employers. Whether you're looking for your first
          internship or your next big career move, we help you connect with the
          right opportunities.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to make job search fast, relevant, and user-friendly.
          We use the latest technologies to provide a smooth experience on all
          devices — desktop or mobile.
        </Typography>
        <Typography variant="body1" paragraph>
          Built with React.js and Spring Boot, our platform ensures performance,
          security, and reliability at every step.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
