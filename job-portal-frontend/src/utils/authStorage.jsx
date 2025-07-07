const KEY = "auth";

/**
 * Persist JWT + user object in localStorage and notify the rest of the app.
 * Will refuse to write if token or user is missing to avoid `{}` entries.
 */
export const saveAuth = (token, user) => {
  if (!token || !user) {
    // console.warn("[saveAuth] token or user missing – nothing stored", {
    //   token,
    //   user,
    // });
    return;
  }
  localStorage.setItem(KEY, JSON.stringify({ token, user }));
  window.dispatchEvent(new Event("storage"));
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("storage"));
};

export const getAuth = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
