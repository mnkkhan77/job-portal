import { useEffect, useState } from "react";

const KEY = "savedJobs";

/* read helper */
const readLS = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const useSavedJobs = () => {
  /* single source of truth pulled from localStorage */
  const [savedJobs, setSavedJobs] = useState(readLS);

  /* keep every component in sync via storage event */
  useEffect(() => {
    const sync = () => setSavedJobs(readLS());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  /* save / unsave */
  const toggleSave = (job) => {
    const current = readLS(); // freshest copy
    const exists = current.find((j) => j.id === job.id);

    const updated = exists
      ? current.filter((j) => j.id !== job.id)
      : [...current, job];

    localStorage.setItem(KEY, JSON.stringify(updated));
    setSavedJobs(updated); // update local state
    window.dispatchEvent(new Event("storage")); // notify others
    return !exists;
  };

  const isSaved = (id) => savedJobs.some((j) => j.id === id);

  return { savedJobs, toggleSave, isSaved };
};
