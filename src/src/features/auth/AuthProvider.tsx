import {
  useState,
  useEffect,
  useCallback,
  createContext,
  type ReactNode,
} from "react";
import type { AuthContextValue, AuthMethods, User } from "./types";

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  methods: AuthMethods;
}

export function AuthProvider({ children, methods }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await methods.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [methods]);

  useEffect(() => {
    if (accessToken) {
      (async () => {
        try {
          const u = await methods.getCurrentUser();
          setUser(u);
        } catch (error) {
          console.error("Failed to fetch current user:", error);
        }
      })();
    }
  }, [accessToken, methods]);

  const logout = useCallback(async () => {
    try {
      await methods.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, [methods]);

  const refresh = useCallback(async () => {
    try {
      const newToken = await methods.refresh();
      setAccessToken(newToken);
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      throw error;
    }
  }, [methods]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isInitializing,
    accessToken,
    logout,
    refresh,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
