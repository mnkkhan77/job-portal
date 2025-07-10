// hooks/useJobs.js
import { useEffect, useState } from "react";
import { listJobs } from "../../api/jobs/index"; // Your modified API function

export default function useJobs({ filters = {}, page = 0, size = 10 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Make the API call with page, size, and filters
    listJobs({ ...filters, page, size })
      .then((res) => {
        const jobs = res.data.content || []; // assuming 'content' holds the job data
        setData(jobs);
        setHasMore(!res.data.last); // `last: false` indicates more pages
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [filters, page, size]);

  return { data, loading, hasMore };
}
