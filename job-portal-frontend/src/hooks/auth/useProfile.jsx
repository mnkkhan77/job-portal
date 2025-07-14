// src/hooks/useProfile.jsx
import { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  const hasFetchedProfile = useRef(false);

  /* ───────── fetch profile only once ───────── */
  useEffect(() => {
    if (hasFetchedProfile.current) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await getProfile();
        if (form.username === "" && form.email === "") {
          setForm({ username: data.username, email: data.user.email || "" });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    hasFetchedProfile.current = true;
  }, []);

  /* ───────── handlers ───────── */
  const handleChange = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSave = async () => {
    if (form.username === "" || form.email === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await getProfile();
      if (data.username !== form.username || data.user.email !== form.email) {
        await updateProfile(form);
        alert("Profile updated.");
      } else {
        alert("No changes detected.");
      }
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
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
