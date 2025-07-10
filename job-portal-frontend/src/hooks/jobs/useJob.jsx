// hooks/useJobs.js
// hooks/useJob.js
import { useEffect, useState } from "react";
import { getJob } from "../../api/jobs/index";

export default function useJob(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getJob(id)
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}
