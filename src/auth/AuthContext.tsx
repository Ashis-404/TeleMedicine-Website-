// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: number;
  role: string;
  phone?: string;
  email?: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void;
  logout: () => void;
};

// ✅ Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ✅ Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // ✅ Sync user with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const setToken = (t: string | null) => setTokenState(t);
  const setUser = (u: User | null) => setUserState(u);

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    localStorage.removeItem("pendingUserId");
    window.location.href = "/signin";
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook to use auth context safely
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
