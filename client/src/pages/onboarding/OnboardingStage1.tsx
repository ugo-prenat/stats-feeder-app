import React, { useContext, useEffect } from 'react'
import TwitchLoginBtn from '../../components/buttons/TwitchLoginBtn'
import Logo from '../../components/Logo'
import PageTitle from '../../components/PageTitle'
import TwitchXTwitterLogo from '../../components/TwitchXTwitterLogo'
import { LangContext } from '../../components/providers/LangContextProvider'

type OnboardingStage1Props = {
  goBack: () => void
}

const OnboardingStage1: React.FC<OnboardingStage1Props> = ({ goBack }) => {
  const { getText } = useContext(LangContext)

  useEffect(() => localStorage.setItem('onboardingStage', '1'), [])

  return (
    <div className="onboarding-stage onboarding-stage-1">
      <Logo homeLink={false} />
      <PageTitle title="onboarding.1.title" description="onboarding.1.description" />

      <div className="component-content">
        <TwitchLoginBtn />
        <TwitchXTwitterLogo />
      </div>
      <span onClick={goBack}>{getText('back')}</span>
    </div>
  )
}
export default OnboardingStage1
