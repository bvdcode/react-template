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

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await methods.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [methods]);

  const login = useCallback(
    async (credentials: unknown) => {
      try {
        const user = await methods.login(credentials);
        setUser(user);
      } catch (error) {
        setUser(null);
        throw error;
      }
    },
    [methods],
  );

  const logout = useCallback(async () => {
    try {
      await methods.logout();
    } finally {
      setUser(null);
    }
  }, [methods]);

  const refresh = useCallback(async () => {
    try {
      const user = await methods.refresh();
      setUser(user);
    } catch (error) {
      setUser(null);
      throw error;
    }
  }, [methods]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isInitializing,
    login,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
