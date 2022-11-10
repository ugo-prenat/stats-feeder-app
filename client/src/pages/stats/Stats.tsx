import React, { useContext } from 'react';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';

type StatsProps = {
  
};

const Stats:React.FC<StatsProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>Statistics</div>
}
export default Stats;