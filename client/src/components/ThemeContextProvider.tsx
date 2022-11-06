import React, { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextProviderProps = {
  children: ReactNode;
};

interface IThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
export const ThemeContext = createContext<IThemeContext>({theme: defaultTheme, toggleTheme: () => {} });

const ThemeContextProvider:React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light'|'dark'>(defaultTheme);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setTheme(colorScheme);
      });
  }, []);
  
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
}
export default ThemeContextProvider;