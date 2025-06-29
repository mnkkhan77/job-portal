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
  const isDark = theme.palette.mode === "dark";

  /* colors that pop on both modes */
  const bg = isDark ? theme.palette.primary.dark : theme.palette.primary.main;
  const text = isDark ? theme.palette.text.primary : theme.palette.common.white;
  const linkCol = isDark
    ? theme.palette.common.white
    : theme.palette.common.white;

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 5,
        backgroundColor: bg,
        color: text,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: "space-evenly" }}>
          {/* ----- brand ----- */}
          <Grid xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              JobPortal
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} JobPortal Inc.
              <br />
              All rights reserved.
            </Typography>
          </Grid>

          {/* ----- company links ----- */}
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Company
            </Typography>
            <Stack spacing={0.5}>
              <Link underline="hover" href="/about" sx={{ color: linkCol }}>
                About Us
              </Link>
              <Link underline="hover" href="/careers" sx={{ color: linkCol }}>
                Careers
              </Link>
            </Stack>
          </Grid>

          {/* ----- support links ----- */}
          <Grid xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Support
            </Typography>
            <Stack spacing={0.5}>
              <Link underline="hover" href="/help" sx={{ color: linkCol }}>
                Help Center
              </Link>
              <Link underline="hover" href="/contact" sx={{ color: linkCol }}>
                Contact&nbsp;Us
              </Link>
              <Link underline="hover" href="/privacy" sx={{ color: linkCol }}>
                Privacy Policy
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
