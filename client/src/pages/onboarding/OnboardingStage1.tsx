import React, { useEffect } from 'react';
import TwitchLoginBtn from '../../components/buttons/TwitchLoginBtn';
import Logo from '../../components/Logo';
import PageTitle from '../../components/PageTitle';
import TwitchXTwitterLogo from '../../components/TwitchXTwitterLogo';

type OnboardingStage1Props = {
  nexStage: () => void,
};

const OnboardingStage1:React.FC<OnboardingStage1Props> = ({ nexStage }) => {
  
  useEffect(() => localStorage.setItem('onboardingStage', '1'), [])
  
  return <div className='onboarding-stage onboarding-stage-1'>
  <Logo homeLink={false} />
  <PageTitle
    title='onboarding.1.title'
    description='onboarding.1.description'
  />
  
  <div className="component-content">
    <TwitchLoginBtn />
    <TwitchXTwitterLogo />
  </div>
</div>
}
export default OnboardingStage1;