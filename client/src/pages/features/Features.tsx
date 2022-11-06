import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContext';

type FunctionalitiesProps = {
  
};

const Functionalities:React.FC<FunctionalitiesProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>
    Fonctionnalités
  </div>
}
export default Functionalities;