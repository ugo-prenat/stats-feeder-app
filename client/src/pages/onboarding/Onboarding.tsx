import React, { useContext, useEffect, useState } from 'react';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';
import { request } from '../../utils/request';

import OnboardingStage0 from './OnboardingStage0';
import OnboardingStage1 from './OnboardingStage1';
import OnboardingStage2 from './OnboardingStage2';

type OnboardingProps = {
  
};

const Onboarding:React.FC<OnboardingProps> = () => {
  const { theme } = useContext(ThemeContext);
  const [stage, setStage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => setStage(0), [])
  
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  const displayCorrectStage = async() => {
    const stage = parseInt(localStorage.getItem('onboardingStage')!);
    const botId = localStorage.getItem('botId');
    const isCorrectBotId = await checkIsCorrectBotId(botId);
    
    if (!stage || stage === 0 || !isCorrectBotId) {
      localStorage.removeItem('botId');
      return setStage(0)
    }
    if (stage && isCorrectBotId) return setStage(stage)
  }
  
  useEffect(() => {
    displayCorrectStage().then(() => setIsLoading(false))
  }, [])

  
  if (isLoading) return <FullScreenLoading label='loading' />
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component onboarding-component`}>
    { stage === 0 && <OnboardingStage0 nexStage={() => setStage(1)} /> }
    { stage === 1 && <OnboardingStage1 nexStage={() => setStage(2)} /> }
    { stage === 2 && <OnboardingStage2 /> }
  </div>
}

const checkIsCorrectBotId = async(botId: string | null): Promise<boolean> => {
  let toReturn = false;
  
  await request('GET', `/bots/${botId}`)
  .then(res => {
    if (res.bot) toReturn = true;
  })
  return toReturn
}

export default Onboarding;