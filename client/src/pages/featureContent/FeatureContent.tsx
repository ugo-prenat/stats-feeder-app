import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../components/ThemeContext';
import FeatureContentList from './FeatureContentList';

type FeatureContentProps = {
  
};

const FeatureContent:React.FC<FeatureContentProps> = () => {
  const { featureId } = useParams<{featureId: string}>() || null;
  
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  if (!featureId) return <FeatureContentList />
  
  return <div className={setThemeClassName('main-component')}>Contenu d'une fonctionnalité : {featureId}</div>
}
export default FeatureContent;