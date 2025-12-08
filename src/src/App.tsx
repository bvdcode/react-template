import { AppRoutes } from "./app/routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./app/providers";
import { AuthProvider, authMethods } from "./features/auth";

function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider methods={authMethods}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default App;
