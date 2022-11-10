import React, { useContext } from 'react';
import { LangContext } from './providers/LangContextProvider';

type PageTitleProps = {
  title: string;
  description?: string;
};

const PageTitle:React.FC<PageTitleProps> = ({ title, description }) => {
  const { getText } = useContext(LangContext);
  
  return <div className='page-title'>
    <h2>{getText(title)}</h2>
    { description && <p>{getText(description)}</p> }
  </div>
}
export default PageTitle;