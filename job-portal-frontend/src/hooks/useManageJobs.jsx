import { useEffect, useState } from "react";

const STORAGE_KEY = "admin_jobs";

const getInitialJobs = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      experience: "2+ yrs",
    },
  ];

const useManageJobs = () => {
  const [jobs, setJobs] = useState(getInitialJobs);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (e) => {
    setRows(parseInt(e.target.value, 10));
    setPage(0);
  };

  const openModal = (job = null) => {
    setEditing(job);
    setForm(job || { title: "", company: "", location: "", experience: "" });
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const saveForm = () => {
    if (editing) {
      setJobs((prev) =>
        prev.map((j) => (j.id === editing.id ? { ...editing, ...form } : j))
      );
    } else {
      setJobs((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const removeJob = (id) => setJobs((prev) => prev.filter((j) => j.id !== id));

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const paginatedJobs = jobs.slice(page * rows, page * rows + rows);

  return {
    jobs,
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
  };
};

export default useManageJobs;
