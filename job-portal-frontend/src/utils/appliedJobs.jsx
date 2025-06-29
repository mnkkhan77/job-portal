// File: src/utils/appliedJobs.js

const APPLIED_JOBS_KEY = "appliedJobs";

export function getAppliedJobs() {
  const data = localStorage.getItem(APPLIED_JOBS_KEY);
  return data ? JSON.parse(data) : [];
}

export function applyToJob(job) {
  const current = getAppliedJobs();
  const exists = current.find((j) => j.id === job.id);
  if (!exists) {
    const updated = [...current, job];
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }
}

export function removeAppliedJob(jobId) {
  const updated = getAppliedJobs().filter((j) => j.id !== jobId);
  localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("storage"));
}
