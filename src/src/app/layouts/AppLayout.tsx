import { Outlet, Link } from "react-router-dom";

export function AppLayout() {
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </header>

      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
