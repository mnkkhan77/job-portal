import { Box, CssBaseline } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

/* ——— shared UI ——— */
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

/* ——— public pages ——— */
import JobDetails from "./components/job/JobDetails";
import HomePage from "./pages/common/HomePage";
import JobsList from "./pages/jobs/JobsList";
import SavedJobs from "./pages/jobs/SavedJobs";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";

import NotFound from "./pages/common/NotFound";
import About from "./pages/info/About";
import Careers from "./pages/info/Careers";
import Contact from "./pages/info/Contact";
import Help from "./pages/info/Help";
import Privacy from "./pages/info/Privacy";

/* ——— admin ——— */
import AdminRoute from "./components/common/AdminRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminHome from "./pages/admin/AdminHome";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageUsers from "./pages/admin/ManageUsers";
import ChangePassword from "./pages/ChangePassword";
import Unauthorized from "./pages/common/Unauthorized";
import AppliedJobs from "./pages/jobs/AppliedJobs";

/* ——— recruiter ——— */
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

/* ——— navbar links ——— */
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Jobs", href: "/jobs" },
  { title: "Saved Jobs", href: "/saved", role: "user", auth: true },
  { title: "Applied Jobs", href: "/applied", role: "user", auth: true },
  { title: "Admin Panel", href: "/admin", role: "admin" },
];

/* ——————————————————————————————————————————— */
/*  Shell component — inside <Router> so hooks work */
function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar navLinks={navLinks} />

      <Box component="main" flexGrow={1}>
        <Routes>
          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user-protected */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/applied" element={<AppliedJobs />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* admin-protected */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminDashboardLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="jobs" element={<ManageJobs />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
          </Route>

          {/* recruiter-protected */}
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          <Route path="/recruiter/jobs" element={<RecruiterJobs />} />

          {/* info */}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      <Footer sx={{ ml: { sm: isAdmin ? "240px" : 0 } }} />
    </Box>
  );
}

/* ——————————————————————————————————————————— */
/*  Root component  */
export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AppShell />
      </Router>
    </>
  );
}
