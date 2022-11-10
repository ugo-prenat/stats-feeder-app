import React, { useContext } from 'react';
import { BsTwitch as TwitchLogo } from 'react-icons/bs';
import { LangContext } from '../providers/LangContextProvider';

const TwitchLoginBtn:React.FC = () => {
  const { getText } = useContext(LangContext);
  
  const CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_TWITCH_REDIRECT_URI;
  
  const scopes = [
    'channel:read:goals',
    'channel:read:polls',
    'channel:read:predictions',
    'user:read:email'
  ]
  const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&username=toto&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes.join('+')}`
  
  const handleClick = () => window.location.href = url;
  
  return <button className='primary-btn twitch-btn' onClick={handleClick}>
    <TwitchLogo />
    <span>{getText('connection')}</span>
  </button>
}
export default TwitchLoginBtn;