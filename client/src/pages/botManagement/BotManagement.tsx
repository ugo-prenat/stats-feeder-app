import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContextProvider';

type BotManagementProps = {
  
};

const BotManagement:React.FC<BotManagementProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>
    Gestion du bot
  </div>
}
export default BotManagement;