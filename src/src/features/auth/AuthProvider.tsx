import {
  useState,
  useEffect,
  useCallback,
  createContext,
  type ReactNode,
} from "react";
import type { AuthContextValue, User } from "./types";

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Boot complete; API layer will adjust auth state later.
    const id = setTimeout(() => setIsInitializing(false), 0);

    // Listen for logout event from httpClient interceptor
    const handleLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      clearTimeout(id);
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  const setAuthenticated = useCallback((value: boolean, u?: User | null) => {
    setIsAuthenticated(value);
    if (typeof u !== "undefined") {
      setUser(u ?? null);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isInitializing,
    setAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
