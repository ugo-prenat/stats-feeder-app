import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import FeatureContentList from './FeatureContentList'

const FeatureContent: React.FC = () => {
  const { featureId } = useParams<{ featureId: string }>() || null

  const { setThemeClassName } = useContext(ThemeContext)

  if (!featureId) return <FeatureContentList />

  return (
    <div className={setThemeClassName('main-component')}>
      Contenu d &apos une fonctionnalité : {featureId}
    </div>
  )
}
export default FeatureContent
