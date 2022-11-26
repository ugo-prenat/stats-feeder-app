import React, { useContext } from 'react'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const NotFound: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return (
    <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
      Page not found
    </div>
  )
}
export default NotFound
