import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useManageJobs from "../../hooks/useManageJobs";

export default function ManageJobs() {
  const {
    form,
    open,
    page,
    rows,
    editing,
    paginatedJobs,
    openModal,
    closeModal,
    handleChangePage,
    handleChangeRows,
    saveForm,
    removeJob,
    handleChange,
    jobs,
  } = useManageJobs();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Job Postings
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => openModal(null)}
      >
        + Add New Job
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.experience}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => openModal(job)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => removeJob(job.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={jobs.length}
          rowsPerPage={rows}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRows}
        />
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Job" : "Add Job"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={form.title}
            onChange={handleChange("title")}
          />
          <TextField
            fullWidth
            label="Company"
            margin="dense"
            value={form.company}
            onChange={handleChange("company")}
          />
          <TextField
            fullWidth
            label="Location"
            margin="dense"
            value={form.location}
            onChange={handleChange("location")}
          />
          <TextField
            fullWidth
            label="Experience"
            margin="dense"
            value={form.experience}
            onChange={handleChange("experience")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={saveForm}>
            {editing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
