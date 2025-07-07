// File: src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthProvider";
import CustomThemeProvider from "./contexts/CustomThemeProvider";
import { JobStateProvider } from "./contexts/JobStateProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
        <JobStateProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </JobStateProvider>
      </AuthProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
