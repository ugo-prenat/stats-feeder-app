import React, { useContext } from 'react'
import Logo from '../../components/Logo'
import { LangContext } from '../../components/providers/LangContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

const OnboardingRegister: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  const twitchToken = document.location.hash.split('&')[0].split('=')[1]
  const botId = localStorage.getItem('botId')

  //const [res, _, isLoading] = UseFetch('POST', '/streamer', { twitchToken, botId })

  return (
    <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
      <Logo homeLink={false} />
      <p className="loading">{getText('registration')}</p>
    </div>
  )
}
export default OnboardingRegister
