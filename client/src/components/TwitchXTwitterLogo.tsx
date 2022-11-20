import Lottie from 'lottie-react';
import React from 'react';
import { BsTwitch as TwitchLogo } from 'react-icons/bs';
import { BsTwitter as TwitterLogo } from 'react-icons/bs';
import linkAnim from '../assets/animations/linkAnim.json'

const TwitchXTwitterLogo:React.FC = () => {
  
  return <div className='twitch-x-twitter'>
    <div className='twitch bubble'><TwitchLogo /></div>
    <div className='link'>
      <Lottie
        animationData={linkAnim}
        initialSegment={[0, 60]}
        loop={false}
        style={{ width: '65%', height: '65%' }}
      />
    </div>
    <div className='twitter bubble'><TwitterLogo /></div>
  </div>
}

export default TwitchXTwitterLogo;