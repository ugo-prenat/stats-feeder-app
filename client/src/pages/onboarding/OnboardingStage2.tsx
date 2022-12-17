import React, { useContext, useEffect, useState } from 'react'
import { LangContext } from '../../components/providers/LangContextProvider'
import Logo from '../../components/Logo'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { IBot, IResponseBot } from '../../models/bot.model'
import { req } from '../../utils/request'

const OnboardingStage2: React.FC = () => {
  const { getText } = useContext(LangContext)
  const [isLoading, setIsLoading] = useState(true)
  const [bot, setBot] = useState<IBot>()

  const botId = localStorage.getItem('botId')

  useEffect(() => {
    req<IResponseBot>('GET', `/bots/${botId}`).then(res => {
      if (res.bot) {
        if (res.bot.status !== 'pending') return (window.location.href = '/')
        setBot(res.bot)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <FullScreenLoading label="loading" />

  console.log(bot)

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
