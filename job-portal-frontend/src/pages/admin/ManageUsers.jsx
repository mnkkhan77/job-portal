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
    <>
      <BreadcrumbsNav path={["Admin", "Manage Users"]} />
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, mb: 2 }}
        >
          Manage Users
        </Typography>

        {/* Add User Button */}
        <Button
          variant="contained"
          sx={{
            mb: 2,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 1.5, sm: 2 },
          }}
          onClick={() => openModal(null)}
        >
          + Add User
        </Button>

        {/* Responsive Table */}
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table size="small">
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
                    <IconButton
                      color="primary"
                      sx={{ mx: { xs: 0.5, sm: 1 } }}
                      onClick={() => openModal(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{ mx: { xs: 0.5, sm: 1 } }}
                      onClick={() => removeUser(user.id)}
                    >
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

          {/* Pagination */}
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

        {/* Modal */}
        <Dialog
          open={open}
          onClose={closeModal}
          fullWidth
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle>{editing ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent sx={{ px: { xs: 1, sm: 3 }, pt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              margin="dense"
              size="small"
              value={form.username}
              onChange={handleChange("username")}
            />
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              size="small"
              value={form.email}
              onChange={handleChange("email")}
            />
            <TextField
              fullWidth
              label="Password"
              margin="dense"
              size="small"
              value={form.password}
              onChange={handleChange("password")}
            />
            <TextField
              select
              fullWidth
              label="Role"
              margin="dense"
              size="small"
              value={form.role}
              onChange={handleChange("role")}
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
              <MenuItem value="recruiter">recruiter</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: { xs: 1, sm: 3 }, pb: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button variant="contained" onClick={saveForm}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
