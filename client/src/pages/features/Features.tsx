import React, { useContext } from 'react';
import { LangContext } from '../../components/LangContextProvider';
import { ThemeContext } from '../../components/ThemeContextProvider';

type FunctionalitiesProps = {
  
};

const Functionalities:React.FC<FunctionalitiesProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { getText } = useContext(LangContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>
    <p>{getText('title.functionnalities')}</p>
  </div>
}
export default Functionalities;