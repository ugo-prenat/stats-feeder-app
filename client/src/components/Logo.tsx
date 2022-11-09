import React, { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContextProvider';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import { Link } from 'react-router-dom';

type LogoProps = {
  homeLink?: boolean;
}
type LogoImgProps = {
  theme: Theme;
}

const Logo:React.FC<LogoProps> = ({ homeLink = true }) => {
  const { theme } = useContext(ThemeContext);
  
  if (homeLink) return <Link to='/'><LogoImg theme={theme} /></Link>
  return <LogoImg theme={theme} />
}

const LogoImg:React.FC<LogoImgProps> = ({ theme }: LogoImgProps) => {
  return <img
    src={theme === 'light' ? logoDark : logoLight}
    className='logo'
    alt="Stats feeder logo"
  />
}

export default Logo;