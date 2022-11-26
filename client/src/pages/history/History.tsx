import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const History: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return <div className={setThemeClassName('main-component')}>Historique</div>
}
export default History
