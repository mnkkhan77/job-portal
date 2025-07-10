// src/context/JobStateContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { listAppliedJobs } from "../api/jobs/applied";
import { listSavedJobs } from "../api/jobs/saved";
import { useAuth } from "../hooks/auth/useAuth";

const JobStateContext = createContext();

export function JobStateProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const fetchedRef = useRef(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

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
