import React, { useContext } from 'react';
import { LangContext } from '../../components/providers/LangContextProvider';
import Logo from '../../components/Logo';

type OnboardingStage2Props = {
  
};

const OnboardingStage2:React.FC<OnboardingStage2Props> = () => {
  const { getText} = useContext(LangContext);
  
  const botName = "Stats Feeder BOT"
  
  return <div className='onboarding-stage onboarding-stage-2'>
    <Logo homeLink={false} />
    <div className='page-title'>
      <h2><span>{botName}</span> {getText('onboarding.2.title')}</h2>
      <p>{getText('onboarding.2.description')}</p>
    </div>
  </div>
}
export default OnboardingStage2;