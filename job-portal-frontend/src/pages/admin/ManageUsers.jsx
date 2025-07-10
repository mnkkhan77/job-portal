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
import useManageUsers from "./../../hooks/admin/useManageUsers";

export default function ManageUsers() {
  const {
    users,
    form,
    open,
    page,
    rows,
    editing,
    visibleUsers,
    openModal,
    closeModal,
    saveForm,
    removeUser,
    handleChange,
    handleChangePage,
    handleChangeRows,
  } = useManageUsers();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => openModal(null)}
      >
        + Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => openModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => removeUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rows}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRows}
        />
      </TableContainer>

      {/* modal */}
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            margin="dense"
            value={form.username}
            onChange={handleChange("username")}
          />
          <TextField
            fullWidth
            label="Email"
            margin="dense"
            value={form.email}
            onChange={handleChange("email")}
          />
          <TextField
            fullWidth
            label="Password"
            margin="dense"
            value={form.password}
            onChange={handleChange("password")}
          />
          <TextField
            select
            fullWidth
            label="Role"
            margin="dense"
            value={form.role}
            onChange={handleChange("role")}
          >
            <MenuItem value="user">user</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="recruiter">recruiter</MenuItem>
          </TextField>
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
