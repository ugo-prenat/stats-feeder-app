import React, { useContext } from 'react';
import { BiDotsHorizontalRounded as DotsIcon } from 'react-icons/bi';
import TwitterRobot from '../../assets/twitterIcons/TwitterRobot';
import { LangContext } from '../providers/LangContextProvider';

type BotDataProps = {
  name: string,
  username: string,
  profileImageUrl?: string
};

const BotData:React.FC<BotDataProps> = ({ name, username, profileImageUrl }) => {
  
  const { getText } = useContext(LangContext)
  
  return <div className='bot-data'>
    <img src={profileImageUrl} alt={`${username}-logo`} />
    <div>
<p className='name'><span>{name}</span></p>
      <p className='username'>@{username}</p>
      <p className='automated'><TwitterRobot /> {getText('automated')}</p>
    </div>
    <DotsIcon className='dots-icon' />
  </div>
}

export default BotData;