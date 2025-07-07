// src/hooks/admin/useAdminMetrics.js
import { useEffect, useState } from "react";
import { getAdminMetrics } from "../../api/users/admin";

/* ─────────────────────────
   Module‑level cache
   ───────────────────────── */
let cachedMetrics = null; // { jobCount, userCount }
let inFlight = null; // Promise to avoid race duplicates

export default function useAdminMetrics() {
  const [metrics, setMetrics] = useState(
    cachedMetrics || { jobCount: 0, userCount: 0 }
  );
  const [loading, setLoading] = useState(!cachedMetrics);

  useEffect(() => {
    if (cachedMetrics) return; // ✅ already cached → no fetch

    // If another component is already fetching, reuse that promise
    if (!inFlight) {
      inFlight = getAdminMetrics()
        .then((data) => {
          cachedMetrics = data; // cache for future hooks
          return data;
        })
        .catch((err) => {
          console.error("admin metrics fetch failed", err);
          throw err;
        })
        .finally(() => {
          inFlight = null; // clear “in‑flight” slot
        });
    }

    inFlight.then((data) => setMetrics(data)).finally(() => setLoading(false));
  }, []);

  return { ...metrics, loading };
}

/* OPTIONAL helper for a manual refresh (call from any component)
export const refreshAdminMetrics = async () => {
  cachedMetrics = null;
  return getAdminMetrics().then((d) => (cachedMetrics = d));
};
*/
