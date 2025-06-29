import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { ColorModeContext } from "./../contexts/CustomThemeProvider";
import { useAuth } from "./useAuth";

const useNavbarLogic = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { isAuthenticated, username, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const canShow = (link) => {
    if (link.role && link.role !== role) return false;
    if (link.auth && !isAuthenticated) return false;
    return true;
  };

  return {
    isAuthenticated,
    username,
    role,
    drawerOpen,
    menuAnchor,
    location,
    theme,
    colorMode,
    handleLogout,
    openMenu,
    closeMenu,
    canShow,
    setDrawerOpen,
    navigate,
  };
};

export default useNavbarLogic;
