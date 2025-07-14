import {
  Brightness4,
  Brightness7,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { ColorModeContext } from "../../contexts/CustomThemeProvider";
import { useAuth } from "../../hooks/auth/useAuth";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";

const drawerWidth = 240;

const AdminDashboardLayout = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { username } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getItemStyles = (path) => {
    const isActive = location.pathname === path;

    return {
      borderRadius: 1,
      mx: 1,
      my: 0.5,
      backgroundColor: isActive ? theme.palette.primary.main : "transparent",
      color: isActive
        ? theme.palette.text.primary
        : theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      transition: "all 0.3s ease",
    };
  };

  // Sidebar items defined as an array
  const sidebarItems = [
    { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { label: "Manage Jobs", path: "/admin/jobs", icon: <WorkIcon /> },
    { label: "Manage Users", path: "/admin/users", icon: <PeopleIcon /> },
  ];

  const listItemTextStyle = {
    fontWeight: "bold",
    color: theme.palette.text.primary,
  };

  const drawer = (
    <Box>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      >
        Admin Panel
      </Typography>

      <Divider />
      <List>
        {sidebarItems.map(({ label, path, icon }) => (
          <ListItem disablePadding key={path}>
            <ListItemButton
              onClick={() => navigate(path)}
              sx={getItemStyles(path)}
            >
              <Box sx={{ mr: 2 }}>{icon}</Box>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <BreadcrumbsNav path={["Home", "Profile"]} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Top AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: theme.palette.primary,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Mobile menu icon */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Admin Title */}
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>

            {/* Right-side: Theme toggle + Avatar menu */}
            <Box>
              <Tooltip title="Toggle theme">
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </Tooltip>

              <IconButton onClick={openMenu}>
                <Avatar sx={{ width: 35, height: 35, fontSize: 18 }}>
                  {username?.[0]?.toUpperCase() || "U"}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
              >
                <MenuItem disabled>Hello, {username}</MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/")}>Public Site</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="admin sidebar"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Permanent drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: theme.palette.background.default,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboardLayout;
