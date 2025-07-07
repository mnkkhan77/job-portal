// src/components/common/ErrorBoundary.jsx
import { Box, Button, Typography } from "@mui/material";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    // soft reload to initial route
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{ p: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Something went wrong 😢
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You can refresh or come back later.
        </Typography>
        <Button variant="contained" onClick={this.handleReload}>
          Reload
        </Button>
      </Box>
    );
  }
}
