import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeTheme } from './reducers/themeSlice';

const useThemePreference = () => {
  const [theme, setTheme] = useState('light'); // Default to light theme
  const dispatch = useDispatch()

  const setPreferredTheme = (isDark) => {
    setTheme(isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setPreferredTheme(prefersDark);

    const handleThemeChange = (e) => {
      setPreferredTheme(e.matches);
    };

    // Listen for changes to the preferred color scheme
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', handleThemeChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return theme;
};

export default useThemePreference;