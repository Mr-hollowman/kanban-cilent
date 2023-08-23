import './App.css';
import { useSelector } from 'react-redux';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const { theme } = useSelector(state => state.theme)
  const defaultTheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
