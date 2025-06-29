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
import HomePage from "./pages/HomePage";
import JobsList from "./pages/JobsList";
import SavedJobs from "./pages/SavedJobs";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";

import About from "./pages/info/About";
import Careers from "./pages/info/Careers";
import Contact from "./pages/info/Contact";
import Help from "./pages/info/Help";
import Privacy from "./pages/info/Privacy";
import NotFound from "./pages/NotFound";

/* ——— admin ——— */
import AdminRoute from "./components/common/AdminRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminHome from "./pages/admin/AdminHome";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageUsers from "./pages/admin/ManageUsers";
import AppliedJobs from "./pages/AppliedJobs";
import Unauthorized from "./pages/Unauthorized";

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
          </Route>

          {/* admin-protected */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminDashboardLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="jobs" element={<ManageJobs />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
          </Route>

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
