import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';


type MenuProps = {
  
};

const Menu:React.FC<MenuProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  
  return <div className={setThemeClassName('menu')}>
    <div className="logo"></div>
    
    <div className="links">
      <Link to="features">Fonctionnalités</Link>
      <Link to="features/content">Contenu des Tweets</Link>
      <Link to="history">Historique</Link>
      <Link to="stats">Statistiques</Link>
      <Link to="settings">Gestion du bot</Link>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
    
    <div className="menu-bottom">
      
    </div>
  </div>
}
export default Menu;