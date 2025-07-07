import { useEffect, useState } from "react";
import { getJob } from "../../api/jobs/index";

export default function useJob(id) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getJob(id)
      .then((res) => setJob(res.data))
      .catch((err) => {
        // console.error("Failed to fetch job:", err);
        setJob(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { job, loading };
}
