// src/components/common/BreadcrumbsNav.jsx
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const pathNameMap = {
  "": "Home",
  jobs: "Jobs",
  job: "Job Details",
  login: "Login",
  register: "Register",
  admin: "Admin",
  recruiter: "Recruiter",
  profile: "Profile",
  users: "Manage Users",
  dashboard: "Dashboard",
};

const BreadcrumbsNav = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x !== "")
    .slice(0, 4); // limit depth if needed

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, ml: "20px" }}>
      <Link component={RouterLink} underline="hover" color="inherit" to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        const name = pathNameMap[value] || decodeURIComponent(value);

        return isLast ? (
          <Typography color="text.primary" key={to}>
            {name}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
