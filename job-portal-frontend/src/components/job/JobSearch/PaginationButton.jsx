import { Box, Button } from "@mui/material";

export default function PaginationButton({ onClick, hasMore }) {
  if (!hasMore) return null;

  return (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <Button variant="contained" onClick={onClick}>
        Show More
      </Button>
    </Box>
  );
}
