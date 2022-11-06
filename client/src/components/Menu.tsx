import React from 'react';
import { Link } from 'react-router-dom';

type MenuProps = {
  
};

const Menu:React.FC<MenuProps> = () => {
  
  return <div className='menu'>
    <Link to="features">Fonctionnalités</Link>
    <Link to="features/content">Contenu des Tweets</Link>
    <Link to="history">Historique</Link>
    <Link to="stats">Statistiques</Link>
    <Link to="settings">Gestion du bot</Link>
  </div>
}
export default Menu;