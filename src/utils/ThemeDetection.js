import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './reducers/themeSlice';
import useThemePreference from './themePreference';

const ThemeDetection = () => {
  const themePreference = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const browserTheme = useThemePreference();

  useEffect(() => {
    if (themePreference === 'light' || themePreference === 'dark') {
      // Theme is already in the state, no need to update it again
      return;
    }else{
        dispatch(changeTheme(browserTheme));
    }

    // Use the browser's theme as the initial preference and dispatch it to the store
  }, [dispatch, themePreference, browserTheme]);

  return null; // This component doesn't need to render anything
};

export default ThemeDetection;