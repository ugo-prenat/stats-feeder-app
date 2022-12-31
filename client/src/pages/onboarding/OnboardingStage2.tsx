import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../components/providers/LangContextProvider'
import Logo from '../../components/Logo'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { getStreamerById, makeStreamerFromApiToDefault } from './onboardingActions'
import { AuthContext } from '../../components/providers/AuthContextProvider'

const OnboardingStage2: React.FC = () => {
  const { getText } = useContext(LangContext)
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

  console.log(bot)
  console.log(streamer)

  return (
    <div className="onboarding-stage onboarding-stage-2">
      <Logo homeLink={false} />
      <div className="page-title">
        <h2>
          <span>{bot?.name}</span> {getText('onboarding.2.title')}
        </h2>
        <p>{getText('onboarding.2.description')}</p>
      </div>
    </div>
  )
}
export default OnboardingStage2
