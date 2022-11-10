import React, { useContext } from 'react';
import { LangContext } from '../../components/providers/LangContextProvider';
import { ThemeContext } from '../../components/providers/ThemeContextProvider';
import UseFetch from '../../hooks/UseFetch';
import { Streamer } from '../../models';

type FunctionalitiesProps = {
  
};

const Functionalities:React.FC<FunctionalitiesProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { getText } = useContext(LangContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  const [ streamers, isLoading ] = UseFetch<Streamer[]>('GET', '/streamers')
  
  return <div className={setThemeClassName('main-component')}>
    <p>{getText('title.functionnalities')}</p>
    <div>
      {isLoading ? <p>Loading...</p> : streamers?.map((streamer, index) => <p key={index}>{streamer.name}</p>)}
    </div>
    
  </div>
}
export default Functionalities;