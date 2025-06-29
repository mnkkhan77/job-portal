const KEY = "auth";
export const login = (username) => {
  const role = username === "admin" ? "admin" : "user";
  localStorage.setItem(
    KEY,
    JSON.stringify({ token: "fake-" + Date.now(), user: { username, role } })
  );
  window.dispatchEvent(new Event("storage"));
};
export const logout = () => {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("storage"));
};
export const getAuth = () => {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
};
