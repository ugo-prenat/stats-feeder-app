import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LangContext } from './providers/LangContextProvider'
import Logo from './Logo'
import { ThemeContext } from './providers/ThemeContextProvider'

const Menu: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  return (
    <div className={setThemeClassName('menu')}>
      <Logo />

      <div className="links">
        <Link to="features">{getText('menu.functionnalities')}</Link>
        <Link to="features/content">{getText('menu.content')}</Link>
        <Link to="history">{getText('menu.history')}</Link>
        <Link to="stats">{getText('menu.stats')}</Link>
        <Link to="settings">{getText('menu.settings')}</Link>
        <Link to="bot-management">{getText('menu.botManagement')}</Link>
      </div>

      <div className="menu-bottom"></div>
    </div>
  )
}
export default Menu
