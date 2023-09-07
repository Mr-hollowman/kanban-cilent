import './App.css';
import { useSelector } from 'react-redux';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './utils/ProtectedRoutes';
import Dashboard from './components/Dashboard';
import Toaster from './utils/Toaster';

function App() {
  const { theme } = useSelector(state => state.theme)
  const defaultTheme = createTheme({
    palette: {
      mode: theme,
      borderColor: theme === "dark" ? "#3E3F4E": "#E4EBFA",
      mainBackground: theme === "dark" ? "#2B2C37" : "#ffffff",
      contentBackground: theme === "dark" ? "#20212C" : "#F4F7FD",
      disabledFont: "#828fa3"
    }
  })
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
