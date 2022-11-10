import React from 'react';
import TwitchLoginBtn from '../../components/buttons/TwitchLoginBtn';
import Logo from '../../components/Logo';
import PageTitle from '../../components/PageTitle';
import TwitchXTwitter from '../../components/TwitchXTwitter';

type OnboardingStage1Props = {
  
};

const OnboardingStage1:React.FC<OnboardingStage1Props> = () => {
  
  return <div className='onboarding-stage onboarding-stage-1'>
  <Logo homeLink={false} />
  <PageTitle
    title='onboarding.1.title'
    description='onboarding.1.description'
  />
  
  <div className="component-content">
    <TwitchLoginBtn />
    <TwitchXTwitter />
  </div>
</div>
}
export default OnboardingStage1;