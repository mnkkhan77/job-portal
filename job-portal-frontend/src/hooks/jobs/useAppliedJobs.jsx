import { useJobState } from "../../contexts/JobStateProvider";

export default function useAppliedJobs() {
  const { appliedJobs, loading, refreshApplied } = useJobState();

  const isApplied = (jobId) => appliedJobs.some((job) => job.id === jobId);

  const refetch = refreshApplied;

  return {
    appliedJobs,
    loading,
    isApplied,
    refetch,
  };
}
