import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { login as apiLogin, register as apiReg } from "../api/auth";
import { fetchUsers as getProfile } from "../api/users";
import { clearAuth, getAuth, saveAuth } from "../utils/authStorage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  /* ---------- state ---------- */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- fetch on app boot ---------- */
  useEffect(() => {
    const boot = async () => {
      if (!getAuth()) return setLoading(false);
      try {
        const { data } = await getProfile();
        setUser(data);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  /* ---------- actions ---------- */
  const login = async (payload) => {
    const { data } = await apiLogin(payload);
    saveAuth(data.token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await apiReg(payload);
    saveAuth(data.token);
    setUser(data.user);
  };

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  /* ---------- provider ---------- */
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
