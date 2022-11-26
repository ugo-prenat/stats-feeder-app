import React, { useContext } from 'react'
import { LangContext } from '../../components/providers/LangContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const Functionalities: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  return (
    <div className={setThemeClassName('main-component')}>
      <p>{getText('title.functionnalities')}</p>
    </div>
  )
}
export default Functionalities
