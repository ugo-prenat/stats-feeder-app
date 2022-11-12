import React, { useState } from 'react';
import ImgInput from '../../components/forms/ImgInput';
import Input from '../../components/forms/Input';
import Logo from '../../components/Logo';
import PageTitle from '../../components/PageTitle';
import Tweet from '../../components/tweet/Tweet';
import UseFetch from '../../hooks/UseFetch';
import { request } from '../../utils/request';
import BasicProfileImg from './../../assets/basic-profile-img.jpg';

type Bot = {
  name: string,
  username: string,
  phoneNumber: Number,
  profileImageUrl: string,
}

const OnboardingStage0:React.FC = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState(BasicProfileImg)
  const tempProfileImageUrl = 'https://pbs.twimg.com/profile_images/1586351236139388930/F-UiT4xl_400x400.jpg'
  const body = 'Bip Bop 🤖'
  
  //const [ res ] = UseFetch('POST', '/twitter/available/username', {username})
  
  
  
  const handleUsernameChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
    const res = await request('POST', '/twitter/available/username', {username: e.currentTarget.value})
    console.log(res);
    
    if (res.error) console.log('error', res.error);
    else if (res.message.data) console.log('found user');
    else console.log('no error found')
  }
  
  return <div className='onboarding-stage onboarding-stage-0 bg-pattern'>
    <Logo homeLink={false} />
    <PageTitle
      title='onboarding.0.title'
      description='onboarding.0.description'
    />
    
    <div className="component-content">
      <div className="left-side">
        <Input
          type='text'
          label={'label.name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='text'
          label={'label.username'}
          value={username}
          onChange={handleUsernameChange}
        />
        <ImgInput
          value={'label.profilePicture'}
          imgUrl={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
        />
      </div>
      
      <Tweet
        bot={{ name, username, profileImageUrl }}
        body={body}
      />
    </div>
    
  </div>
}
export default OnboardingStage0;