import React, { useState } from 'react';
import Logo from '../../components/Logo';
import PageTitle from '../../components/PageTitle';
import Tweet from '../../components/tweet/Tweet';

type OnboardingStage0Props = {
  
};
type Bot = {
  name: string,
  username: string,
  phoneNumber: Number,
  profileImageUrl: string,
}

const OnboardingStage0:React.FC<OnboardingStage0Props> = () => {
  const [name, setName] = useState('Stats Feeder BOT')
  const [username, setUsername] = useState('statsFeederBot')
  const [phoneNumber, setPhoneNumber] = useState<Number>()
  const [profileImageUrl, setProfileImageUrl] = useState('https://pbs.twimg.com/profile_images/1586351236139388930/F-UiT4xl_400x400.jpg')
  const body = 'Bip Bop 🤖'
  
  return <div className='onboarding-stage onboarding-stage-0'>
    <Logo homeLink={false} />
    <PageTitle
      title='onboarding.0.title'
      description='onboarding.0.description'
    />
    
    <div className="component-content">
      <div className="left-side">
        les champs
      </div>
      
      <Tweet
        bot={{ name, username, profileImageUrl }}
        body={body}
      />
    </div>
    
  </div>
}
export default OnboardingStage0;