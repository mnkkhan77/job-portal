const KEY = "savedJobs";

export const getSavedJobs = () => JSON.parse(localStorage.getItem(KEY)) || [];

export const isSaved = (id) => getSavedJobs().some((j) => j.id === id);

export const toggleSave = (job) => {
  const list = getSavedJobs();
  const exists = list.find((j) => j.id === job.id);

  const updated = exists
    ? list.filter((j) => j.id !== job.id) // remove
    : [...list, job]; // add

  localStorage.setItem(KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("storage")); // notify other tabs
  return !exists; // returns new saved state
};
