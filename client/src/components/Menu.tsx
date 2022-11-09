import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from './LangContextProvider';
import Logo from './Logo';
import { ThemeContext } from './ThemeContextProvider';


type MenuProps = {
  
};

const Menu:React.FC<MenuProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, changeLang, getText } = useContext(LangContext);
  
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  
  return <div className={setThemeClassName('menu')}>
    <Logo />
    
    <div className="links">
      <Link to="features">{getText('menu.functionnalities')}</Link>
      <Link to="features/content">{getText('menu.content')}</Link>
      <Link to="history">{getText('menu.history')}</Link>
      <Link to="stats">{getText('menu.stats')}</Link>
      <Link to="settings">{getText('menu.settings')}</Link>
      <Link to="bot-management">{getText('menu.botManagement')}</Link>
      
      <button onClick={toggleTheme}>toggle theme</button>
      <select
        onChange={e => changeLang(e.target.value as 'en' | 'fr')}
        defaultValue={lang}
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
    
    <div className="menu-bottom">
      
    </div>
  </div>
}
export default Menu;