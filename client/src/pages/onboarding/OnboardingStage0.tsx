import React, { useState } from 'react';
import Logo from '../../components/Logo';
import Tweet from '../../components/tweet/Tweet';
import Input from '../../components/forms/Input';
import PageTitle from '../../components/PageTitle';
import ImgInput from '../../components/forms/ImgInput';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { FiArrowRight as RightArrowIcon } from 'react-icons/fi';
import BasicProfileImg from './../../assets/basic-profile-img.jpg';
import TwitterUsernameInput from '../../components/forms/TwitterUsernameInput';

type BotDataFormProps = {
  name: string,
  setName: (name: string) => void,
  username: string,
  setUsername: (username: string) => void,
  profileImg: string,
  setProfileImg: (profileImg: string) => void,
}

const OnboardingStage0:React.FC = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState(BasicProfileImg)
  const body = 'Bip Bop 🤖'
  
  return <div className='onboarding-stage onboarding-stage-0 bg-pattern'>
    <Logo homeLink={false} />
    <PageTitle
      title='onboarding.0.title'
      description='onboarding.0.description'
    />
    
    <div className="component-content">
      <BotDataForm
        name={name}
        setName={setName}
        username={username}
        setUsername={setUsername}
        profileImg={profileImage}
        setProfileImg={setProfileImage}
      />
      
      <Tweet
        bot={{ name, username, profileImage }}
        body={body}
      />
    </div>
    
  </div>
}

const BotDataForm:React.FC<BotDataFormProps> = ({ name, setName, username, setUsername, profileImg, setProfileImg }) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = () => {
    setIsSubmitting(true)
    console.log('submitting');
  }
  
  return <form onSubmit={handleSubmit}>
    <Input
      label={'label.name'}
      value={name}
      onChange={(e) => setName(e.target.value)}
      required={false}
    />
    <TwitterUsernameInput
      username={username}
      setUsername={setUsername}
    />
    <ImgInput
      value={'label.profilePicture'}
      imgUrl={profileImg}
      onChange={(e) => setProfileImg(e.target.value)}
    />
    <PrimaryBtn
      text='btn.nextStep'
      icon={<RightArrowIcon />}
      iconPosition='right'
      disabled={isSubmitting}
    />
  </form>
}

export default OnboardingStage0;