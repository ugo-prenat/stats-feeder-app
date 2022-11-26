import React, { createContext, ReactNode, useEffect, useState } from 'react'

type ThemeContextProviderProps = {
  children: ReactNode
}

export type Theme = 'light' | 'dark'

interface IThemeContext {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setThemeClassName: (className: string) => string
}

export const defaultTheme = getDefualtTheme()
export const ThemeContext = createContext<IThemeContext>({
  theme: defaultTheme,
  toggleTheme: () => {},
  setThemeClassName: (className: string) => className
})

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  const setThemeClassName = (className: string) =>
    `${className}${theme === 'light' ? ` ${className}-light` : ''}`

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const colorScheme = event.matches ? 'dark' : 'light'
      setTheme(colorScheme)
      localStorage.setItem('theme', colorScheme)
      setFavicon()
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeClassName }}>
      {children}
    </ThemeContext.Provider>
  )
}

function getDefualtTheme(): Theme {
  const localTheme = localStorage.getItem('theme')
  if (localTheme) return localTheme as Theme

  //const theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const theme = 'dark'
  localStorage.setItem('theme', theme)
  setFavicon()

  return theme
}

function setFavicon() {
  const navTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  const faviconTheme = navTheme === 'light' ? 'dark' : 'light'
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
  favicon.href = `./favicon-${faviconTheme}.ico`
}

export default ThemeContextProvider
