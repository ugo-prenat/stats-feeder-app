import { createContext } from "react";

export interface IThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
export const ThemeContext = createContext<IThemeContext>({theme: defaultTheme, toggleTheme: () => {} });