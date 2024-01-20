// import { ThemeProvider } from 'styled-components';
// import TogglerButton from './components/TogglerButton';
// import GlobalStyle from './styles/global';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
// import ThemeContext from './contexts/ThemeContext';
// import { lightTheme, darkTheme } from './styles/themes';
// import useThemeMode from './hooks/useThemeMode';
import "./App.css";
import Dashboard from './Pages/Dashboard';
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state: any) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;