import { applyToJob } from "./applied";
import { listSavedJobs, saveJob, unsaveJob } from "./saved";

export const toggleSaveJob = async (jobId, currentlySaved) => {
  if (currentlySaved) {
    await unsaveJob(jobId);
    return false;
  }
  await saveJob(jobId);
  return true;
};

export const isSaved = async (jobId) => {
  const { data } = await listSavedJobs();
  return data.some((j) => j.id === jobId);
};

export { applyToJob };
