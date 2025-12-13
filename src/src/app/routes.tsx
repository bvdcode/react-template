import type { RouteConfig } from "./types";
import { RequireAuth } from "../features/auth";
import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFoundPage } from "../pages";
import { AppLayout, PublicLayout } from "./layouts";
import { Dashboard, Home } from "@mui/icons-material";
import { Box } from "@mui/material";

const publicRoutes: RouteConfig[] = [
  { path: "/login", displayName: "Login", element: <LoginPage /> },
];

const appRoutes: RouteConfig[] = [
  {
    path: "/",
    displayName: "Home",
    element: <>h</>,
    protected: false,
    icon: <Home />,
  },
  {
    path: "/dashboard",
    displayName: "Dashboard",
    element: (
      <Box width="100%" height="100%" bgcolor="red">
        Dashboard
      </Box>
    ),
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

      <Route element={<AppLayout routes={appRoutes} />}>
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
