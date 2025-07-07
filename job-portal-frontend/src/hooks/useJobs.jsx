import { useEffect, useState } from "react";
import { listJobs } from "../api/jobs";

export default function useJobs(filters = {}) {
  const key = JSON.stringify(filters);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    listJobs(filters)
      .then((res) => {
        const jobs = res.data.content ?? res.data;
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
