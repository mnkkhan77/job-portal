import { useState } from "react";

export const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appliedJobs")) || [];
    } catch (e) {
      return [];
    }
  });

  const applyToJob = (job) => {
    const exists = appliedJobs.find((j) => j.id === job.id);
    if (!exists) {
      const updated = [...appliedJobs, job];
      setAppliedJobs(updated);
      localStorage.setItem("appliedJobs", JSON.stringify(updated));
    }
  };

  const hasApplied = (jobId) => appliedJobs.some((j) => j.id === jobId);

  return { appliedJobs, applyToJob, hasApplied };
};
