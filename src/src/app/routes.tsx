import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFoundPage } from "../pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
