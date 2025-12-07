import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Outlet />
    </div>
  );
}
