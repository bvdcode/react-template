import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
      setIsAuthenticated(true);
    }, 1000);
  }, []);

  return { isAuthenticated, isInitializing };
}
