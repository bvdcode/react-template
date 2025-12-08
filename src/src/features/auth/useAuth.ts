import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
      setIsAuthenticated(true);
    }, 100450);
  }, []);

  return { isAuthenticated, isInitializing };
}
