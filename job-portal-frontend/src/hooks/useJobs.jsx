import { useEffect, useMemo, useState } from "react";
import { listJobs } from "../api/jobs";

export default function useJobs(filters = {}) {
  const key = useMemo(() => JSON.stringify(filters), [filters]);

  const [data, setData] = useState({
    content: [],
    last: false,
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    listJobs(filters)
      .then((res) => {
        // Assuming res.data has the pagination structure:
        // { content: [...], last, totalElements, totalPages, number, size }
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setData({
          content: [],
          last: false,
          totalElements: 0,
          totalPages: 0,
          number: 0,
          size: 0,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  return {
    data: data.content,
    loading,
    error,
    last: data.last,
    totalElements: data.totalElements,
    pageNumber: data.number,
  };
}
