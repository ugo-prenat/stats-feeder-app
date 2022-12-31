import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeContextProvider'
import { LogoSvg } from '../../assets/LogoSvg'

const LogoLoading: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)

  return (
    <div className={`${setThemeClassName('loading-component')}`}>
      <LogoSvg />
    </div>
  )
}

export default LogoLoading
