import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  const footerSections = [
    {
      label: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      label: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        width: "100%",
        py: 5,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: "space-evenly" }}>
          {/* Brand section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              JobPortal
            </Typography>
            <Typography variant="body2" fontWeight={"bold"}>
              © {new Date().getFullYear()} JobPortal Inc.
              <br />
              All rights reserved.
            </Typography>
          </Grid>

          {/* Dynamic footer sections */}
          {footerSections.map(({ label, links }) => (
            <Grid xs={12} md={4} key={label}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {label}
              </Typography>
              <Stack spacing={0.5}>
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    underline="hover"
                    href={href}
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary, // better for dark/light
                      "&:hover": {
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
