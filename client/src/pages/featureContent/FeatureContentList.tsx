import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const FeatureContentList: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return (
    <div className={setThemeClassName('main-component')}>Liste des contenu de fonctionnalités</div>
  )
}
export default FeatureContentList
