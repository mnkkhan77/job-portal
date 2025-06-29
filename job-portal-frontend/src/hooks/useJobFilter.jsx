import { useMemo, useState } from "react";

// maps experience text to numeric band for sorting
const expValue = (exp) => {
  if (!exp) return 0;
  const match = exp.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export default function useJobFilter(allJobs = []) {
  /* UI state */
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [experience, setExp] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  /* derived result */
  const filtered = useMemo(() => {
    let list = [...allJobs];

    /* --- search --- */
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }

    /* --- location filter --- */
    if (location !== "all") {
      list = list.filter((j) => j.location === location);
    }

    /* --- experience filter --- */
    if (experience !== "all") {
      list = list.filter((j) => j.experience === experience);
    }

    /* --- sort --- */
    switch (sortBy) {
      case "salaryHigh":
        list.sort((a, b) => b.salary - a.salary);
        break;
      case "salaryLow":
        list.sort((a, b) => a.salary - b.salary);
        break;
      case "expHigh":
        list.sort((a, b) => expValue(b.experience) - expValue(a.experience));
        break;
      case "expLow":
        list.sort((a, b) => expValue(a.experience) - expValue(b.experience));
        break;
      default:
        break;
    }

    return list;
  }, [allJobs, query, location, experience, sortBy]);

  /* helpers */
  const clearFilters = () => {
    setQuery("");
    setLocation("all");
    setExp("all");
    setSortBy("none");
  };

  return {
    query,
    location,
    experience,
    sortBy,
    setQuery,
    setLocation,
    setExp,
    setSortBy,
    clearFilters,
    filteredJobs: filtered,
  };
}
