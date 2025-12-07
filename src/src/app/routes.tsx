import type { JSX } from "react";
import { RequireAuth } from "../features/auth";
import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFoundPage } from "../pages";
import { AppLayout, PublicLayout } from "./layouts";

type RouteConfig = {
  path: string;
  element: JSX.Element;
  protected?: boolean;
};

const publicRoutes: RouteConfig[] = [
  { path: "/login", element: <LoginPage /> },
];

const appRoutes: RouteConfig[] = [
  { path: "/dashboard", element: <>Dashboard</>, protected: true },
  // { path: "/something", element: <SomethingPage />, protected: false }
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
