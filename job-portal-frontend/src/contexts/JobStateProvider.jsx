// src/context/JobStateContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { listAppliedJobs } from "../api/jobs/applied";
import { listSavedJobs } from "../api/jobs/saved";

const JobStateContext = createContext();

export function JobStateProvider({ children }) {
  const fetchedRef = useRef(false); // 👈 guard
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    if (fetchedRef.current) return; // already fetched – skip
    fetchedRef.current = true; // mark as fetched
    try {
      const [savedRes, appliedRes] = await Promise.all([
        listSavedJobs(),
        listAppliedJobs(),
      ]);
      setSavedJobs(savedRes.data);
      setAppliedJobs(appliedRes.data);
    } catch (e) {
      console.error("job state fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  /* one‑time fetch even under StrictMode */
  useEffect(() => {
    fetchAll();
  }, []);

  /* …rest unchanged… */
  return (
    <JobStateContext.Provider
      value={{
        savedJobs,
        appliedJobs,
        loading,
        refreshSaved: async () => {
          const res = await listSavedJobs();
          setSavedJobs(res.data);
        },
        refreshApplied: async () => {
          const res = await listAppliedJobs();
          setAppliedJobs(res.data);
        },
      }}
    >
      {children}
    </JobStateContext.Provider>
  );
}

export const useJobState = () => useContext(JobStateContext);
