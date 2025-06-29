import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function CustomThemeProvider({ children }) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [mode, setMode] = useState(prefersDark ? "dark" : "light");

  useEffect(() => {
    const listener = (e) => setMode(e.matches ? "dark" : "light");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#6C63FF", // bold purple
          },
          secondary: {
            main: "#FF6584", // pink highlight
          },
          background: {
            default: mode === "light" ? "#f3f4f6" : "#1e1e2f",
            paper: mode === "light" ? "#ffffff" : "#2c2c40",
          },
          text: {
            primary: mode === "light" ? "#1a1a1a" : "#f3f3f3",
            secondary: mode === "light" ? "#4a4a4a" : "#bbbbbb",
          },
        },
        typography: {
          fontFamily: `"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif`,
          h6: { fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                boxShadow:
                  mode === "light"
                    ? "0 2px 8px rgba(0,0,0,0.05)"
                    : "0 2px 8px rgba(255,255,255,0.05)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
