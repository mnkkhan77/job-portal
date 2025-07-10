import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecruiterJobs,
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../../api/jobs/profile";
import { useAuth } from "../auth/useAuth";

export default function useRecruiterProfile() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "" });
  const [jobsPosted, setJobsPosted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, jobsRes] = await Promise.all([
          getRecruiterProfile(),
          getRecruiterJobs(),
        ]);
        setForm({
          username: profileRes.data.username,
          email: profileRes.data.email || "",
        });
        setJobsPosted(jobsRes.data.length);
      } catch (err) {
        console.error("Failed to fetch recruiter data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    try {
      await updateRecruiterProfile(form);
      alert("Profile updated.");
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const handleGoToJobs = () => {
    navigate("/recruiter/jobs");
  };

  return {
    form,
    jobsPosted,
    loading,
    navigate,
    handleChange,
    handleSave,
    handleGoToJobs,
    role,
  };
}
