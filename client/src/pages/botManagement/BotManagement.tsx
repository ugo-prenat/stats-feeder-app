import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const BotManagement: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return <div className={setThemeClassName('main-component')}>Gestion du bot</div>
}
export default BotManagement
