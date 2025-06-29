// src/hooks/useAuth.js
import { useSyncExternalStore } from "react";

const KEY = "auth"; // where we store fake-JWT + user/role

/* subscribe:  tell React to re-run snapshot when “storage” fires */
const subscribe = (cb) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

/* snapshot:  *string* in localStorage (stable unless value really changes) */
const getSnapshot = () => localStorage.getItem(KEY) || null;

export const useAuth = () => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const auth = raw ? JSON.parse(raw) : null;

  return {
    isAuthenticated: !!auth?.token,
    username: auth?.user?.username,
    role: auth?.user?.role,
  };
};
