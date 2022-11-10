import React from 'react';
import { BsTwitch as TwitchLogo } from 'react-icons/bs';
import { BsTwitter as TwitterLogo } from 'react-icons/bs';
import { FiLink as LinkLogo } from 'react-icons/fi';

type TwitchXTwitterProps = {
  
};

const TwitchXTwitter:React.FC<TwitchXTwitterProps> = () => {
  
  return <div className='twitch-x-twitter'>
    <div className='twitch bubble'><TwitchLogo /></div>
    <div className='link'><LinkLogo /></div>
    <div className='twitter bubble'><TwitterLogo /></div>
  </div>
}

export default TwitchXTwitter;