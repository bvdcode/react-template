import type { RouteConfig } from "../types";
import { Outlet, Link } from "react-router-dom";

export function AppLayout(routes: RouteConfig[]) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: "0.5rem 1rem",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <nav>
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              style={{ marginRight: "1rem" }}
            >
              {route.displayName}
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
