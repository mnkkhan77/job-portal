import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../api/users";

let cachedUsers = null; // 🔒 Persistent for session

const useManageUsers = () => {
  const [users, setUsers] = useState(cachedUsers || []);
  const [loading, setLoading] = useState(!cachedUsers);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });

  const loadUsers = async () => {
    if (cachedUsers) return; // ✅ skip if already fetched
    setLoading(true);
    try {
      const data = await fetchUsers();
      cachedUsers = data.content;
      setUsers(data.content);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openModal = (user = null) => {
    setEditing(user);
    setForm(user || { name: "", email: "", role: "user" });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const saveForm = async () => {
    try {
      if (editing) {
        const updated = await updateUser(editing.id, form);
        setUsers((prev) =>
          prev.map((u) => (u.id === editing.id ? updated : u))
        );
        cachedUsers = users.map((u) => (u.id === editing.id ? updated : u));
      } else {
        const created = await createUser(form);
        setUsers((prev) => [...prev, created]);
        cachedUsers = [...users, created];
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      cachedUsers = updated;
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (e) => {
    setRows(parseInt(e.target.value, 10));
    setPage(0);
  };

  const visibleUsers = users.slice(page * rows, page * rows + rows);

  return {
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
    loading,
  };
};

export default useManageUsers;
