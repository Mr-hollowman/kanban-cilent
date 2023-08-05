import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './utils/reducers/themeSlice';
import { Box, Button, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';

function App() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.users)
  const { theme } = useSelector(state => state.theme)
  const defaultTheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box>
        {loading && <Typography>Loading.........</Typography>}
        <Button onClick={() => dispatch(changeTheme(theme === "dark" ? "light" : "dark"))}>Change Theme</Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
