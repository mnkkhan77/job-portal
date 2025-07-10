// src/hooks/admin/useAdminMetrics.js
import { useEffect, useState } from "react";
import { getAdminMetrics } from "../../api/users/admin";

let cachedMetrics = null; // { jobCount, userCount }
let inFlight = null;

export default function useAdminMetrics() {
  const [metrics, setMetrics] = useState(
    cachedMetrics || { jobCount: 0, userCount: 0 }
  );
  const [loading, setLoading] = useState(!cachedMetrics);

  useEffect(() => {
    if (cachedMetrics) return;

    if (!inFlight) {
      inFlight = getAdminMetrics()
        .then((data) => {
          cachedMetrics = data;
          return data;
        })
        .catch((err) => {
          console.error("admin metrics fetch failed", err);
          throw err;
        })
        .finally(() => {
          inFlight = null;
        });
    }

    inFlight.then((data) => setMetrics(data)).finally(() => setLoading(false));
  }, []);

  return { ...metrics, loading };
}
