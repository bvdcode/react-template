import {
  useState,
  useEffect,
  useCallback,
  createContext,
  type ReactNode,
} from "react";
import { authApi } from "../../shared/api/authApi";
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
    let mounted = true;
    (async () => {
      // Attempt silent refresh before finishing initialization
      try {
        await authApi.refresh();
        if (mounted) {
          setIsAuthenticated(true);
        }
      } catch {
        // No active refresh cookie
      }
      if (!mounted) {
        return;
      }
      setIsInitializing(false);
    })();

    // Listen for logout event from httpClient interceptor
    const handleLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      mounted = false;
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
