import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import Tweet from '../../components/tweet/Tweet';
import PageTitle from '../../components/PageTitle';
import BasicProfileImg from './../../assets/basic-profile-img.jpg';
import BotDataForm from './BotDataForm';

type OnboardingStage0Props = {
  nexStage: () => void,
};

export interface IProfileImg {
  data: File;
  preview: string;
}

const OnboardingStage0:React.FC<OnboardingStage0Props> = ({ nexStage }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [profileImage, setProfileImage] = useState<IProfileImg>({
    data: new File([], BasicProfileImg),
    preview: BasicProfileImg
  })
  const body = 'Bip Bop 🤖'
  
  useEffect(() => localStorage.setItem('onboardingStage', '0'), [])
  
  
  return <div className='onboarding-stage onboarding-stage-0 bg-pattern'>
    <Logo homeLink={false} />
    <PageTitle
      title='onboarding.0.title'
      description='onboarding.0.description'
    />
    
    <div className="component-content">
      <BotDataForm
        setName={setName}
        setUsername={setUsername}
        previewImg={profileImage.preview}
        setProfileImg={setProfileImage}
        nextStage={nexStage}
      />
      
      <Tweet
        bot={{ name, username, profileImage: profileImage.preview }}
        body={body}
      />
    </div>
    
  </div>
}

export default OnboardingStage0;