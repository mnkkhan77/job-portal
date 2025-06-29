// File: src/pages/Privacy.jsx
import { Box, Container, Typography } from "@mui/material";

const Privacy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" paragraph>
          At JobPortal, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, and protect your personal information.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          What We Collect
        </Typography>
        <Typography variant="body2" paragraph>
          We may collect your name, email address, resume details, and job
          preferences when you register or apply for jobs through our platform.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          How We Use It
        </Typography>
        <Typography variant="body2" paragraph>
          Your information helps us personalize your job search experience and
          connect you with relevant employers. We do not sell your data to third
          parties.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Data Security
        </Typography>
        <Typography variant="body2" paragraph>
          We implement robust security measures to protect your personal data
          against unauthorized access.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Contact Us
        </Typography>
        <Typography variant="body2">
          If you have any questions about our privacy practices, please contact
          us at <strong>privacy@jobportal.com</strong>.
        </Typography>
      </Box>
    </Container>
  );
};

export default Privacy;
