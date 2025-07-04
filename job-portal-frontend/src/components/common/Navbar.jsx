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
import useNavBarLogic from "./../../hooks/useNavBarLogic";

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
          sx: { backgroundColor: "primary.main", color: "secondary.main" },
        }}
      >
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.filter(canShow).map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItem button component={RouterLink} to={link.href}>
                  <ListItemText
                    primary={link.title}
                    primaryTypographyProps={{ color: "secondary.main" }}
                  />
                </ListItem>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

          <List>
            {isAuthenticated ? (
              <>
                <ListItem button component={RouterLink} to="/profile">
                  <ListItemText
                    primary="My Profile"
                    primaryTypographyProps={{ color: "secondary.main" }}
                  />
                </ListItem>
                {role === "admin" && (
                  <ListItem button component={RouterLink} to="/admin">
                    <ListItemText
                      primary="Admin Dashboard"
                      primaryTypographyProps={{ color: "secondary.main" }}
                    />
                  </ListItem>
                )}
                <ListItem button onClick={handleLogout}>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ color: "secondary.main" }}
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={RouterLink} to="/login">
                  <ListItemText
                    primary="Login"
                    primaryTypographyProps={{ color: "secondary.main" }}
                  />
                </ListItem>
                <ListItem button component={RouterLink} to="/register">
                  <ListItemText
                    primary="Register"
                    primaryTypographyProps={{ color: "secondary.main" }}
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
