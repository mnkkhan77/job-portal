import { useCallback, useEffect, useState } from "react";
import {
  createMyJob,
  deleteMyJob,
  listMyJobs,
  updateMyJob,
} from "../../api/recruiter/jobs";

export default function useRecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listMyJobs();
      setJobs(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh(); // ✅ Correct usage
  }, [refresh]);

  const add = async (payload) => {
    await createMyJob(payload);
    refresh();
  };
  const update = async (id, payload) => {
    await updateMyJob(id, payload);
    refresh();
  };
  const remove = async (id) => {
    await deleteMyJob(id);
    refresh();
  };

  return { jobs, loading, add, update, remove };
}
