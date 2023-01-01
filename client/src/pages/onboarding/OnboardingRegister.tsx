import React, { useCallback, useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import { LangContext } from '../../components/providers/LangContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import { OnboardingContext } from '../../components/providers/OnboardingContextProvider'
import BotDialog from './BotDialog'
import { registerStreamer } from './onboardingActions'

const OnboardingRegister: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)
  const { setBot, bot } = useContext(OnboardingContext)

  const [showDialog, setShowDialog] = useState(false)

  const twitchToken = document.location.hash.split('&')[0].split('=')[1]
  const botId = localStorage.getItem('botId')

  const returnToStage = useCallback((stageId: number, error: string | undefined) => {
    localStorage.setItem('onboardingStage', stageId.toString())

    if (error) localStorage.setItem('onboardingError', error)
    window.location.href = '/onboarding'
  }, [])

  useEffect(() => {
    const registration = async () => {
      await registerStreamer(twitchToken, botId)
        .then(res => {
          if (!res.streamer && !res.bot) return returnToStage(0, res.error)

          if (res.streamer) {
            localStorage.setItem('streamerId', res.streamer._id)
            localStorage.setItem('botId', res.streamer.bot._id)
            localStorage.setItem('onboardingStage', '2')

            setBot(res.streamer.bot)
            window.location.href = '/onboarding'
          } else if (res.bot) {
            localStorage.setItem('streamerId', res.bot.streamer ? res.bot.streamer._id : '')
            localStorage.setItem('botId', res.bot._id)

            setBot(res.bot)
            setShowDialog(true)
          }
        })
        .catch(res => returnToStage(1, res.error))
    }
    registration()
  }, [botId, returnToStage, setBot, twitchToken])

  return (
    <>
      <div
        className={`${setThemeClassName('main-component')} fullscreen-component ${setThemeClassName(
          'onboarding-component'
        )}`}
      >
        <Logo homeLink={false} />
        <p className="loading">{getText('registration')}</p>
        {showDialog && bot && <BotDialog bot={bot} />}
      </div>
    </>
  )
}

export default OnboardingRegister
