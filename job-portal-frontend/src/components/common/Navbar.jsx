import {
  Brightness4,
  Brightness7,
  BusinessCenter,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useNavBarLogic from "./../../hooks/ui/useNavBarLogic";

const Navbar = ({ navLinks }) => {
  const {
    isAuthenticated,
    username,
    role,
    drawerOpen,
    menuAnchor,
    location,
    colorMode,
    theme,
    handleLogout,
    openMenu,
    closeMenu,
    canShow,
    setDrawerOpen,
    navigate,
  } = useNavBarLogic();

  return (
    <>
      <AppBar position="sticky" elevation={2} color="primary">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BusinessCenter sx={{ mr: 1 }} />
              <Typography variant="h6">JobPortal</Typography>
            </Box>

            {/* desktop links */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {navLinks.filter(canShow).map((link) => (
                <Link
                  key={link.title}
                  component={RouterLink}
                  to={link.href}
                  underline="none"
                  color="inherit"
                  sx={{
                    textDecoration:
                      location.pathname === link.href ? "underline" : "none",
                  }}
                >
                  {link.title}
                </Link>
              ))}

              {/* theme switcher */}
              <Tooltip title="Toggle light / dark mode">
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </Tooltip>

              {/* profile menu */}
              {isAuthenticated ? (
                <>
                  <IconButton onClick={openMenu}>
                    <Avatar sx={{ width: 30, height: 30 }}>
                      {username?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={closeMenu}
                  >
                    <MenuItem disabled>Hello, {username}</MenuItem>
                    {role === "admin" && (
                      <MenuItem onClick={() => navigate("/admin")}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    {role === "recruiter" && (
                      <MenuItem onClick={() => navigate("/recruiter/jobs")}>
                        Recruiter Dashboard
                      </MenuItem>
                    )}

                    <MenuItem onClick={() => navigate("/profile")}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    color="inherit"
                    size="small"
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>

            {/* mobile drawer icon */}
            <Box
              sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
            >
              <Tooltip title="Toggle light / dark mode">
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </Tooltip>

              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.filter(canShow).map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItem
                  button
                  component={RouterLink}
                  to={link.href}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary={link.title}
                    primaryTypographyProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                  />
                </ListItem>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: theme.palette.divider }} />

          <List>
            {isAuthenticated ? (
              <>
                <ListItem
                  button
                  component={RouterLink}
                  to="/profile"
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary="My Profile"
                    primaryTypographyProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                  />
                </ListItem>
                {role === "admin" && (
                  <ListItem
                    button
                    component={RouterLink}
                    to="/admin"
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary="Admin Dashboard"
                      primaryTypographyProps={{
                        sx: { color: theme.palette.text.primary },
                      }}
                    />
                  </ListItem>
                )}
                <ListItem
                  button
                  onClick={handleLogout}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary="Login"
                    primaryTypographyProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={RouterLink}
                  to="/register"
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText
                    primary="Register"
                    primaryTypographyProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
