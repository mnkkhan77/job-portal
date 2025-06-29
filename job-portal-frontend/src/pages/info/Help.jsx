// File: src/pages/Help.jsx
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";

const Help = () => {
  const faqs = [
    {
      question: "How do I apply for a job?",
      answer:
        'Click the "View Details" button on a job card, then click "Apply Now" on the job description page.',
    },
    {
      question: "Can I save jobs to view later?",
      answer:
        'Yes, click the "Save Job" button on the job details page to bookmark it for later.',
    },
    {
      question: "How do I create an account?",
      answer:
        'Click the "Register" button in the top right navbar and fill in the required information.',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Help Center
      </Typography>
      <Typography variant="body1" paragraph>
        Browse frequently asked questions or contact our support team for more
        help.
      </Typography>

      <Box sx={{ mt: 4 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default Help;
