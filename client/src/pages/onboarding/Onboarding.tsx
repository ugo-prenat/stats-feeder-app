import React, { useContext, useEffect, useState } from 'react'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import { IBotResponse } from '../../models/bot.model'
import { req } from '../../utils/request'
import OnboardingStage0 from './OnboardingStage0'
import OnboardingStage1 from './OnboardingStage1'
import OnboardingStage2 from './OnboardingStage2'

const Onboarding: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const [stage, setStage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => setStage(0), [])

  const displayCorrectStage = async () => {
    const stage = parseInt(localStorage.getItem('onboardingStage') || '0')
    const botId = localStorage.getItem('botId')
    const isCorrectBotId = botId ? await checkIsCorrectBotId(botId) : false

    if (stage === 0 || !isCorrectBotId) {
      localStorage.removeItem('botId')
      return setStage(0)
    }
    if (stage && isCorrectBotId) return setStage(stage)
  }

  useEffect(() => {
    displayCorrectStage().then(() => setIsLoading(false))
  }, [])

  if (isLoading) return <FullScreenLoading label="loading" />

  return (
    <>
      <div
        className={`${setThemeClassName(
          'main-component'
        )} fullscreen-component onboarding-component`}
      >
        {stage === 0 && <OnboardingStage0 nexStage={() => setStage(1)} />}
        {stage === 1 && <OnboardingStage1 nexStage={() => setStage(2)} />}
        {stage === 2 && <OnboardingStage2 />}
      </div>
    </>
  )
}

const checkIsCorrectBotId = async (botId: string): Promise<boolean> => {
  return req<IBotResponse>('GET', `/bots/${botId}`).then(res => (res.bot ? true : false))
}

export default Onboarding
