import React, { useContext } from 'react';
import Logo from '../../components/Logo';
import { LangContext } from '../../components/providers/LangContextProvider';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';
import UseFetch from '../../hooks/UseFetch';

type OnboardingRegisterProps = {
  
};

const OnboardingRegister:React.FC<OnboardingRegisterProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { getText } = useContext(LangContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  const twitchToken = document.location.hash.split('&')[0].split('=')[1]
  const botId = localStorage.getItem('botId')
  
  const [ res, _, isLoading ] = UseFetch('POST', '/streamer', {twitchToken, botId})
  
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
    <Logo homeLink={false} />
    <p className='loading'>{getText('registration')}</p>
  </div>
}
export default OnboardingRegister;