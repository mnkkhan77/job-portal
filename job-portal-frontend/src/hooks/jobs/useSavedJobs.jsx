import { useJobState } from "../../contexts/JobStateProvider";

export default function useSavedJobs() {
  const { savedJobs, loading, refreshSaved } = useJobState();

  const isSaved = (jobId) => savedJobs.some((job) => job.id === jobId);

  const toggleSave = async (job) => {
    try {
      const { toggleSaveJob } = await import("../../api/jobs/actions");
      await toggleSaveJob(job.id, isSaved(job.id)); // true = unsave
      await refreshSaved(); // update cache
    } catch (e) {
      console.error("Failed to toggle save", e);
    }
  };

  return {
    savedJobs,
    loading,
    isSaved,
    toggleSave,
  };
}
