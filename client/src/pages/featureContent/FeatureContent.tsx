import React from 'react';
import { useParams } from 'react-router-dom';
import FeatureContentList from './FeatureContentList';

type FeatureContentProps = {
  
};

const FeatureContent:React.FC<FeatureContentProps> = () => {
  const { featureId } = useParams<{featureId: string}>() || null;
  
  if (!featureId) return <FeatureContentList />
  
  return <div className='main-component'>Contenu d'une fonctionnalité : {featureId}</div>
}
export default FeatureContent;