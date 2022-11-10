import React, { useContext } from 'react';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';

type FeatureContentListProps = {
  
};

const FeatureContentList:React.FC<FeatureContentListProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>Liste des contenu de fonctionnalités</div>
}
export default FeatureContentList;