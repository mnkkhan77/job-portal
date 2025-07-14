import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
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
import { useState } from "react";
import useRecruiterJobs from "../../hooks/recruiter/useRecruiterJobs";
import BreadcrumbsNav from "./../../components/common/BreadcrumbsNav";

export default function RecruiterJobs() {
  const { jobs, loading, add, update, remove } = useRecruiterJobs();

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "onsite",
    experience: 1,
    description: "",
    minSalary: 0,
    maxSalary: 0,
  });

  const openModal = (job = null) => {
    setEditing(job);
    setForm(
      job || {
        title: "",
        company: "",
        location: "onsite",
        experience: 1,
        description: "",
        minSalary: 0,
        maxSalary: 0,
      }
    );
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const handleChange = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const save = async () => {
    editing ? await update(editing.id, form) : await add(form);
    closeModal();
  };

  const visible = jobs.slice(page * rows, page * rows + rows);

  return (
    <>
      <BreadcrumbsNav path={["Recruiter", "Manage Jobs"]} />
      <Box>
        <Typography variant="h4" gutterBottom>
          My Posted Jobs
        </Typography>

        <Button variant="contained" sx={{ mb: 2 }} onClick={() => openModal()}>
          + Post New Job
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {/* Loading... */}
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No jobs posted yet.
                  </TableCell>
                </TableRow>
              ) : (
                visible.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell>{j.title}</TableCell>
                    <TableCell>{j.company}</TableCell>
                    <TableCell>{j.location}</TableCell>
                    <TableCell>{j.experience}+ yrs</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => openModal(j)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => remove(j.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            count={jobs.length}
            rowsPerPage={rows}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRows(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>

        <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
          <DialogTitle>{editing ? "Edit Job" : "Post Job"}</DialogTitle>
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
              select
              fullWidth
              label="Location"
              margin="dense"
              value={form.location}
              onChange={handleChange("location")}
            >
              <MenuItem value="onsite">On‑site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
            </TextField>
            <TextField
              type="number"
              fullWidth
              label="Experience (years)"
              margin="dense"
              value={form.experience}
              onChange={handleChange("experience")}
              inputProps={{ min: 0 }}
            />
            <TextField
              type="number"
              fullWidth
              label="Min Salary"
              margin="dense"
              value={form.minSalary}
              onChange={handleChange("minSalary")}
            />
            <TextField
              type="number"
              fullWidth
              label="Max Salary"
              margin="dense"
              value={form.maxSalary}
              onChange={handleChange("maxSalary")}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              margin="dense"
              value={form.description}
              onChange={handleChange("description")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="contained" onClick={save}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
