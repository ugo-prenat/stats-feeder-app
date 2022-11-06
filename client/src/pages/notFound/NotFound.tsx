import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContext';

type NotFoundProps = {
  
};

const NotFound:React.FC<NotFoundProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={`${setThemeClassName('main-component')} fullscreen-component`}>Page not found</div>
}
export default NotFound;