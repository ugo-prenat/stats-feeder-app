import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../components/providers/LangContextProvider'
import Logo from '../../components/Logo'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { getStreamerById, makeStreamerFromApiToDefault } from './onboardingActions'
import { AuthContext } from '../../components/providers/AuthContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import Bot from '../../components/Bot'
import PageTitle from '../../components/PageTitle'
import LogoLoading from '../../components/loading/LogoLoading'

const OnboardingStage2: React.FC = () => {
  const { getText } = useContext(LangContext)
  const { setThemeClassName } = useContext(ThemeContext)
  const { bot, streamer, setBot, setStreamer } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)

  const streamerId = localStorage.getItem('streamerId')

  const returnToStage = useCallback((stageId: number) => {
    localStorage.setItem('onboardingError', 'login.error')
    localStorage.setItem('onboardingStage', stageId.toString())
    window.location.href = '/onboarding'
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      await getStreamerById(streamerId)
        .then(res => {
          if (!res.streamer) return returnToStage(1)
          if (!res.streamer.bot) return returnToStage(0)
          if (res.streamer.bot.status !== 'pending') return (window.location.href = '/')

          setStreamer(makeStreamerFromApiToDefault(res.streamer))
          setBot(res.streamer.bot)
          setIsLoading(false)
        })
        .catch(() => returnToStage(0))
    }
    checkAuth()
  }, [returnToStage, setBot, setStreamer, streamerId])

  if (isLoading) return <FullScreenLoading label="loading" />

  return (
    <div className={`onboarding-stage onboarding-stage-2 ${setThemeClassName('bg-pattern')}`}>
      <Logo homeLink={false} />
      <div className="component-content">
        <PageTitle
          title={`${bot?.name} ${getText('onboarding.2.title')}`}
          description={getText('onboarding.2.description')}
        />
        <Bot bot={bot} />
      </div>
      <LogoLoading />
    </div>
  )
}
export default OnboardingStage2
