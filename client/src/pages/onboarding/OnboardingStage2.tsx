import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LangContext } from '../../components/providers/LangContextProvider'
import Logo from '../../components/Logo'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { getStreamerById } from './onboardingActions'
import { AuthContext } from '../../components/providers/AuthContextProvider'

const OnboardingStage2: React.FC = () => {
  const { getText } = useContext(LangContext)
  const { bot, streamer, setBot, setStreamer } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  const streamerId = localStorage.getItem('streamerId')

  useEffect(() => {
    console.log('called')

    const checkAuth = async () => {
      await getStreamerById(streamerId)
        .then(res => {
          console.log(res)

          if (res.bot.status !== 'pending') return (window.location.href = '/')

          setStreamer(res)
          setBot(res.bot)
          console.log('still here')

          setIsLoading(false)

          ///////////////////////////////////////
          // problème de récupération du streamer
          ///////////////////////////////////////
        })
        .catch(res => {
          console.log(res)

          localStorage.setItem('onboardingError', 'login.error')
          localStorage.removeItem('onboardingStage')
          //window.location.href = '/onboarding'
        })
    }
    checkAuth()
  }, [setBot, setStreamer, streamerId])

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
