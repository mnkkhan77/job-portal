import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
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
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";
import useManageJobs from "./../../hooks/jobs/useManageJobs";

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
    <>
      <BreadcrumbsNav path={["Admin", "Manage Jobs"]} />
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, mb: 2 }}
        >
          Manage Job Postings
        </Typography>

        {/* Add Job Button */}
        <Button
          variant="contained"
          sx={{
            mb: 2,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 1.5, sm: 2 },
          }}
          onClick={() => openModal(null)}
        >
          + Add New Job
        </Button>

        {/* Responsive Table */}
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table size="small">
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
                  <TableCell>{job.experience}+ Years</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      sx={{ mx: { xs: 0.5, sm: 1 } }}
                      onClick={() => openModal(job)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{ mx: { xs: 0.5, sm: 1 } }}
                      onClick={() => removeJob(job.id)}
                    >
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

          {/* Pagination */}
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
        <Dialog
          open={open}
          onClose={closeModal}
          fullWidth
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle>{editing ? "Edit Job" : "Add Job"}</DialogTitle>
          <DialogContent sx={{ px: { xs: 1, sm: 3 }, pt: 2 }}>
            {/* Form Fields */}
            <TextField
              fullWidth
              label="Title"
              margin="dense"
              size="small"
              value={form.title}
              onChange={handleChange("title")}
            />

            <TextField
              fullWidth
              label="Company"
              margin="dense"
              size="small"
              value={form.company}
              onChange={handleChange("company")}
            />

            <TextField
              fullWidth
              label="Description"
              margin="dense"
              size="small"
              value={form.description}
              onChange={handleChange("description")}
            />

            <TextField
              select
              fullWidth
              label="Location"
              margin="dense"
              size="small"
              value={form.location}
              onChange={handleChange("location")}
            >
              <MenuItem value="onsite">On‑site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Experience (years)"
              inputProps={{ min: 0 }}
              margin="dense"
              size="small"
              value={form.experience}
              onChange={handleChange("experience")}
            />

            <TextField
              fullWidth
              type="number"
              label="Min Salary"
              inputProps={{ min: 0 }}
              margin="dense"
              size="small"
              value={form.minSalary}
              onChange={handleChange("minSalary")}
            />

            <TextField
              fullWidth
              type="number"
              label="Max Salary"
              inputProps={{ min: 0 }}
              margin="dense"
              size="small"
              value={form.maxSalary}
              onChange={handleChange("maxSalary")}
            />
            <TextField
              fullWidth
              label="Job Link"
              margin="dense"
              size="small"
              value={form.jobLink}
              onChange={handleChange("jobLink")}
            />
          </DialogContent>

          <DialogActions sx={{ px: { xs: 1, sm: 3 }, pb: 2 }}>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={saveForm}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
