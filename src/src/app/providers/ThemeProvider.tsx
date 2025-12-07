import { ThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo, ReactNode } from "react";
import { darkTheme, lightTheme, type ThemeMode } from "../../shared/theme";
import { createTheme, alpha, darken, lighten } from "@mui/material/styles";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeContextProvider");
  }
  return context;
};

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const theme = useMemo(() => {
    const base = mode === "light" ? lightTheme : darkTheme;
    const overrides =
      mode === "light" ? themeOverrides?.light : themeOverrides?.dark;
    if (!overrides) return base;

    const primaryMain = overrides.primary ?? base.palette.primary.main;
    const secondaryMain = overrides.secondary ?? base.palette.secondary.main;
    const backgroundDefault =
      overrides.background ?? base.palette.background.default;
    const textPrimary = overrides.text ?? base.palette.text.primary;

    // derive paper, divider, text.secondary from provided colors
    const paper =
      mode === "light"
        ? lighten(backgroundDefault, 0.98)
        : darken(backgroundDefault, 0.1);
    const divider = alpha(textPrimary, mode === "light" ? 0.08 : 0.06);
    const textSecondary = alpha(textPrimary, mode === "light" ? 0.6 : 0.75);

    return createTheme(base, {
      palette: {
        primary: { main: primaryMain },
        secondary: { main: secondaryMain },
        background: {
          ...base.palette.background,
          default: backgroundDefault,
          paper,
        },
        text: {
          ...base.palette.text,
          primary: textPrimary,
          secondary: textSecondary,
        },
        divider,
      },
    });
  }, [mode, themeOverrides]);

  const contextValue = useMemo(
    () => ({ mode, toggleTheme }),
    [mode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ToastContainer theme={mode} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
