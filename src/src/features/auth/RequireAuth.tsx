import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function RequireAuth({ children }: Props) {
  // const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
      setIsAuthenticated(true);
    }, 450);
  }, []);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
