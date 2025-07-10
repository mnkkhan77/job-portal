// hooks/useJobs.js
import { useEffect, useState } from "react";
import { listJobs } from "../../api/jobs/index";

export default function useJobs({ filters = {}, page = 0, size = 10 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    listJobs({ ...filters, page, size })
      .then((res) => {
        const jobs = res.data.content || [];
        setData(jobs);
        setHasMore(!res.data.last);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [filters, page, size]);

  return { data, loading, hasMore };
}
