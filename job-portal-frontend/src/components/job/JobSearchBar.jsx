import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

export default function JobSearchBar({
  query,
  location,
  experience,
  sortBy,
  setQuery,
  setLocation,
  setExp,
  setSortBy,
  clearFilters,
  locations,
  expOptions,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="stretch"
      >
        <TextField
          fullWidth
          placeholder="Search title, company, location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Location</InputLabel>
          <Select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Experience</InputLabel>
          <Select
            label="Experience"
            value={experience}
            onChange={(e) => setExp(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {expOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            label="Sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="salaryHigh">Salary: High → Low</MenuItem>
            <MenuItem value="salaryLow">Salary: Low → High</MenuItem>
            <MenuItem value="expHigh">Experience: High → Low</MenuItem>
            <MenuItem value="expLow">Experience: Low → High</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
      </Stack>
    </Box>
  );
}
