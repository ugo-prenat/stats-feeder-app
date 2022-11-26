import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const Settings: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return <div className={setThemeClassName('main-component')}>Paramètres</div>
}
export default Settings
