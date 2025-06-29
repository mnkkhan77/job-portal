// src/pages/JobsList.jsx
import { Box, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import jobsData from "../data/jobs.json";
import useJobFilter from "../hooks/useJobFilter";
import JobCard from "./../components/job/JobCard";
import JobSearchBar from "./../components/job/JobSearchBar";

/* -------- helpers -------- */
const normalizeExperience = (exp) => {
  const m = exp.match(/^(\d+)/);
  return m ? `${m[1]}+ years` : exp;
};

/* sort numeric (Fresher gets 0) */
const expSort = (a, b) => {
  const num = (s) => (s.toLowerCase().includes("fresh") ? 0 : parseInt(s));
  return num(a) - num(b);
};

export default function JobsList() {
  /* ------------- filter/sort state via hook ------------- */
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
    filteredJobs, // already search + location filtered
  } = useJobFilter(jobsData);

  /* ------------- derive distinct dropdown values ------------- */
  const locations = [...new Set(jobsData.map((j) => j.location))].sort();
  const expOptions = [
    ...new Set(jobsData.map((j) => normalizeExperience(j.experience))),
  ].sort(expSort);

  /* ------------- apply experience bucket after normalising ------------- */
  const finalJobs = useMemo(() => {
    if (experience === "all") return filteredJobs;

    return filteredJobs.filter(
      (j) => normalizeExperience(j.experience) === experience
    );
  }, [filteredJobs, experience]);

  /* ------------- show-more pagination ------------- */
  const [visibleCount, setVisibleCount] = useState(6);
  const showMore = () => setVisibleCount((prev) => prev + 6);
  const hasMore = visibleCount < finalJobs.length;

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      {/* search / filter / sort bar */}
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

      {/* job grid */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {finalJobs.length === 0 ? (
          <Typography variant="h6">No jobs found.</Typography>
        ) : (
          finalJobs
            .slice(0, visibleCount)
            .map((job) => <JobCard key={job.id} job={job} />)
        )}
      </Box>

      {/* Show More button */}
      {hasMore && (
        <Box textAlign="center" mt={4}>
          <Button variant="outlined" onClick={showMore}>
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}
