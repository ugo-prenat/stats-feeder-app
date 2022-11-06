import React, { useContext } from 'react';
import { ThemeContext } from '../../components/ThemeContext';

type HistoryProps = {
  
};

const History:React.FC<HistoryProps> = () => {
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={setThemeClassName('main-component')}>Historique</div>
}
export default History;