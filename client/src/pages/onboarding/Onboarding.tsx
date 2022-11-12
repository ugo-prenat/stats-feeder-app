import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';

import OnboardingStage0 from './OnboardingStage0';
import OnboardingStage1 from './OnboardingStage1';
import OnboardingStage2 from './OnboardingStage2';

type OnboardingProps = {
  
};

const Onboarding:React.FC<OnboardingProps> = () => {
  const { theme } = useContext(ThemeContext);
  const [stage, setStage] = useState(0)
  useEffect(() => {
    setStage(0)
  }, [])
  
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  useEffect(() => {
    // Get auth token to get user stage after quit
  }, [])
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component onboarding-component`}>
    { stage === 0 && <OnboardingStage0 /> }
    { stage === 1 && <OnboardingStage1 /> }
    { stage === 2 && <OnboardingStage2 /> }
  </div>
}
export default Onboarding;