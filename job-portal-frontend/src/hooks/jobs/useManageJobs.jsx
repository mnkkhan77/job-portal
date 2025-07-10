import { useEffect, useState } from "react";
import {
  createAdminJob,
  deleteAdminJob,
  listAdminJobs,
  updateAdminJob,
} from "../../api/jobs/admin";

let cachedJobs = null;

const useManageJobs = () => {
  const [jobs, setJobs] = useState(cachedJobs || []);
  const [loading, setLoading] = useState(!cachedJobs);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    description: "",
  });

  const fetchJobs = async () => {
    if (cachedJobs) return;
    setLoading(true);
    try {
      const res = await listAdminJobs();
      cachedJobs = res.data;
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (e) => {
    setRows(parseInt(e.target.value, 10));
    setPage(0);
  };

  const openModal = (job = null) => {
    setEditing(job);
    setForm(
      job || {
        title: "",
        company: "",
        location: "",
        experience: "",
        minSalary: "",
        maxSalary: "",
        description: "",
      }
    );
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const saveForm = async () => {
    try {
      const jobData = {
        title: form.title,
        company: form.company,
        location: form.location,
        experience: form.experience,
        minSalary: Number(form.minSalary),
        maxSalary: Number(form.maxSalary),
        description: form.description || "",
        postedBy: user.id,
      };

      if (editing) {
        const res = await updateAdminJob(editing.id, jobData);
        const updated = jobs.map((j) => (j.id === editing.id ? res.data : j));
        setJobs(updated);
        cachedJobs = updated;
      } else {
        const res = await createAdminJob(jobData);
        const updated = [...jobs, res.data];
        setJobs(updated);
        cachedJobs = updated;
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save job", err);
    }
  };

  const removeJob = async (id) => {
    try {
      await deleteAdminJob(id);
      const updated = jobs.filter((j) => j.id !== id);
      setJobs(updated);
      cachedJobs = updated;
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  const paginatedJobs = jobs.slice(page * rows, page * rows + rows);

  return {
    jobs,
    loading,
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
