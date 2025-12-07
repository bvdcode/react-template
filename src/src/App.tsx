import { AppRoutes } from "./app/routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./app/providers";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
