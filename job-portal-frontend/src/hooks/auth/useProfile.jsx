// src/hooks/useProfile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile, updateProfile } from "../../api/users/profile";
import { useJobState } from "../../contexts/JobStateProvider";
import { useAuth } from "./useAuth";

export default function useProfile() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const { savedJobs, appliedJobs, loading: jobsLoading } = useJobState();

  /* profile form */
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true); // only for profile

  /* ───────── fetch profile once ───────── */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProfile();
        setForm({ username: data.username, email: data.email || "" });
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ───────── handlers ───────── */
  const handleChange = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSave = async () => {
    try {
      await updateProfile(form);
      alert("Profile updated.");
    } catch {
      alert("Failed to update profile.");
    }
  };

  /* live counts without extra API calls */
  const savedCount = savedJobs.length;
  const appliedCount = appliedJobs.length;

  return {
    form,
    role,
    loading: loading || jobsLoading,
    savedCount,
    appliedCount,
    navigate,
    handleChange,
    handleSave,
  };
}
