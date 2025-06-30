// src/router.jsx (React Router v6 example)
import { lazy, Suspense } from "react";
const AdminPage = lazy(() => import("./pages/admin/AdminHome"));
const JobsList = lazy(() => import("./pages/JobsList"));

<Routes>
  <Route
    path="/admin/*"
    element={
      <Suspense fallback={<Spinner />}>
        <AdminPage />
      </Suspense>
    }
  />
  <Route
    path="/job/:id"
    element={
      <Suspense fallback={<Spinner />}>
        <JobsList />
      </Suspense>
    }
  />
</Routes>;
