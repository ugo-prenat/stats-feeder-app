import React, { useContext } from 'react';
import { LogoSvg } from '../../assets/LogoSvg';
import { LangContext } from '../providers/LangContextProvider';
import { ThemeContext } from '../providers/ThemeContextProvider';

type FullScreenLoadingProps = {
  label?: string,
  logoLoading?: boolean
};

const FullScreenLoading:React.FC<FullScreenLoadingProps> = ({ label, logoLoading=true }) => {
  const { theme } = useContext(ThemeContext);
  const { getText } = useContext(LangContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component ${setThemeClassName('loading-component')}`}>
    { logoLoading && <LogoSvg /> }
    { label && <p>{getText(label)}</p> }
  </div>
}

export default FullScreenLoading;