import React from 'react';
import Logo from '../../components/Logo';
import PageTitle from '../../components/PageTitle';

type OnboardingStage1Props = {
  
};

const OnboardingStage1:React.FC<OnboardingStage1Props> = () => {
  
  return <div className='onboarding-stage onboarding-stage-1'>
  <Logo homeLink={false} />
  <PageTitle
    title='onboarding.1.title'
    description='onboarding.1.description'
  />
</div>
}
export default OnboardingStage1;