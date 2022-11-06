import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContextProvider';

type SettingsProps = {
  
};

const Settings:React.FC<SettingsProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>
    Paramètres
  </div>
}
export default Settings;