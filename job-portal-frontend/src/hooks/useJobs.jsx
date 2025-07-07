import { useEffect, useState } from "react";
import { listJobs } from "../api/jobs";

export default function useJobs(filters = {}) {
  const key = JSON.stringify(filters);
  const cacheKey = "jobs::" + key;

  const [data, setData] = useState(() => {
    const cached = sessionStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem(cacheKey)
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      setError(null);
      return; // Skip fetching
    }

    setLoading(true);
    setError(null);

    listJobs(filters)
      .then((res) => {
        const jobs = res.data.content ?? res.data;
        sessionStorage.setItem(cacheKey, JSON.stringify(jobs));
        setData(jobs);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  return { data, loading, error };
}
