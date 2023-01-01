import React, { useContext } from 'react'
import { Theme, ThemeContext } from './providers/ThemeContextProvider'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import { Link } from 'react-router-dom'
import { LangContext } from './providers/LangContextProvider'

type LogoProps = {
  homeLink?: boolean
}
type LogoImgProps = {
  theme: Theme
}

const Logo: React.FC<LogoProps> = ({ homeLink = true }) => {
  const { theme } = useContext(ThemeContext)

  if (homeLink)
    return (
      <Link to="/">
        <LogoImg theme={theme} />
      </Link>
    )
  return <LogoImg theme={theme} />
}

const LogoImg: React.FC<LogoImgProps> = ({ theme }: LogoImgProps) => {
  const { toggleTheme } = useContext(ThemeContext)
  const { lang, changeLang } = useContext(LangContext)

  const ENV = import.meta.env.VITE_ENV

  return (
    <>
      <img
        src={theme === 'light' ? logoDark : logoLight}
        className="logo"
        alt="Stats feeder logo"
      />
      {ENV === 'DEV' && (
        <div className="dev-settings">
          <button onClick={toggleTheme}>toggle theme</button>
          <select onChange={e => changeLang(e.target.value as 'en' | 'fr')} defaultValue={lang}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      )}
    </>
  )
}

export default Logo
