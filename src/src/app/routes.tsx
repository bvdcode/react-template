import type { JSX } from "react";
import { RequireAuth } from "../features/auth";
import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFoundPage } from "../pages";
import { AppLayout, PublicLayout } from "./layouts";
import { Dashboard, Home } from "@mui/icons-material";

type RouteConfig = {
  path: string;
  displayName: string;
  element: JSX.Element;
  protected?: boolean;
  icon?: JSX.Element;
};

const publicRoutes: RouteConfig[] = [
  { path: "/login", displayName: "Login", element: <LoginPage /> },
];

const appRoutes: RouteConfig[] = [
  {
    path: "/",
    displayName: "Home",
    element: <>!!! HOME !!!</>,
    protected: false,
    icon: <Home />,
  },
  {
    path: "/dashboard",
    displayName: "Dashboard",
    element: <>!!! Dashboard !!!</>,
    protected: true,
    icon: <Dashboard />,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route element={<AppLayout />}>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <RequireAuth>{route.element}</RequireAuth>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
