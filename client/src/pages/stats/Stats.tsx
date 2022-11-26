import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const Stats: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return <div className={setThemeClassName('main-component')}>Statistics</div>
}
export default Stats
