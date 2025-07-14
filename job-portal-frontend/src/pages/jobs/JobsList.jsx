// src/pages/JobsList.jsx
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import JobCard from "../../components/job/JobCard";
import JobSearchBar from "../../components/job/JobSearch/JobSearchBar";
import useJobFilter from "../../hooks/jobs/useJobFilter";
import useJobs from "../../hooks/useJobs";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";

const expSort = (a, b) => {
  const num = (s) =>
    typeof s === "string" && s.toLowerCase().includes("fresh")
      ? 0
      : parseInt(s, 10) || 0;
  return num(a) - num(b);
};

export default function JobsList() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const filters = useMemo(() => ({}), []);

  // Fetch jobs for current page
  const {
    data: apiJobs,
    loading,
    last,
    totalElements,
  } = useJobs({ filters, page, size: pageSize });

  // Local state to accumulate all loaded jobs across pages
  const [allJobs, setAllJobs] = useState([]);

  // Append newly fetched jobs to allJobs state
  useEffect(() => {
    if (apiJobs && apiJobs.length > 0) {
      setAllJobs((prev) => {
        const existingIds = new Set(prev.map((j) => j.id));
        const newJobs = apiJobs.filter((j) => !existingIds.has(j.id));
        return [...prev, ...newJobs];
      });
    }
  }, [apiJobs]);

  const showLoadMore = totalElements == null || allJobs.length < totalElements;

  // Pass accumulated jobs to filter hook
  const {
    query,
    location,
    experience,
    sortBy,
    setQuery,
    setLocation,
    setExp,
    setSortBy,
    clearFilters,
    filteredJobs,
  } = useJobFilter(allJobs);

  const locations = [...new Set(filteredJobs.map((j) => j.location))].sort();
  const expOptions = [...new Set(filteredJobs.map((j) => j.experience))].sort(
    expSort
  );

  const finalJobs = useMemo(() => {
    if (experience === "all") return filteredJobs;
    return filteredJobs.filter((j) => j.experience === experience);
  }, [filteredJobs, experience]);

  // Load more handler increments page number
  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      <BreadcrumbsNav path={["Home"]} />
      <JobSearchBar
        query={query}
        location={location}
        experience={experience}
        sortBy={sortBy}
        setQuery={setQuery}
        setLocation={setLocation}
        setExp={setExp}
        setSortBy={setSortBy}
        clearFilters={clearFilters}
        locations={locations}
        expOptions={expOptions}
      />

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {loading && page === 0 ? (
          // <Typography sx={{ m: 4 }}>Loading…</Typography>
          <CircularProgress />
        ) : finalJobs.length === 0 ? (
          <Typography variant="h6">No jobs found.</Typography>
        ) : (
          finalJobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </Box>

      {showLoadMore && (
        <Box textAlign="center" mt={4}>
          <Button variant="outlined" onClick={loadMore} disabled={loading}>
            {loading ? (
              // "Loading..."
              <CircularProgress />
            ) : (
              "Load More"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}
