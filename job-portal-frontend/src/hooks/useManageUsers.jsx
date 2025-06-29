import { useEffect, useState } from "react";

const STORAGE_KEY = "admin_users";

const getInitialUsers = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { id: 1, name: "Alice", email: "alice@mail.com", role: "user" },
    { id: 2, name: "Bob", email: "bob@mail.com", role: "admin" },
  ];

const useManageUsers = () => {
  const [users, setUsers] = useState(getInitialUsers);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const openModal = (user = null) => {
    setEditing(user);
    setForm(user || { name: "", email: "", role: "user" });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const saveForm = () => {
    if (editing) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editing.id ? { ...editing, ...form } : u))
      );
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const removeUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

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
  };
};

export default useManageUsers;
