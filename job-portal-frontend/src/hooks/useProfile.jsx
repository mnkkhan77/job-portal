import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAppliedJobs } from "../utils/appliedJobs";
import { getSavedJobs } from "../utils/savedJobs";

/* update auth object in localStorage */
const updateAuthProfile = (changes) => {
  const raw = localStorage.getItem("auth");
  if (!raw) return;
  const auth = JSON.parse(raw);
  auth.user = { ...auth.user, ...changes };
  localStorage.setItem("auth", JSON.stringify(auth));
  window.dispatchEvent(new Event("storage"));
};

const useProfile = () => {
  const { username, role } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { user } = JSON.parse(raw);
      setForm({ username: user.username, email: user.email || "" });
    }
  }, []);

  const savedCount = getSavedJobs().length;
  const appliedCount = getAppliedJobs().length;

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    updateAuthProfile(form);
    alert("Profile updated (local only).");
  };

  return {
    form,
    role,
    username,
    savedCount,
    appliedCount,
    navigate,
    handleChange,
    handleSave,
  };
};

export default useProfile;
