import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContext';

type OnboardingProps = {
  
};

const Onboarding:React.FC<OnboardingProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
    Onboarding
  </div>
}
export default Onboarding;