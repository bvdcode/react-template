import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function RequireAuth({ children }: Props) {
  // const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();
  let isAuthenticated = false;
  let isInitializing = true;

  setTimeout(() => {
    isInitializing = false;
    isAuthenticated = true;
  }, 1250);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
