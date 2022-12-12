import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import Tweet from '../../components/tweet/Tweet'
import PageTitle from '../../components/PageTitle'
import BasicProfileImg from './../../assets/basic-profile-img.jpg'
import BotDataForm from './BotDataForm'
import { LangContext } from '../../components/providers/LangContextProvider'
import { Intention } from './onboardingModels'
import { ToastContainer } from 'react-toastify'
import { handleUrlParamsErrors } from './onboardingActions'

type OnboardingStage0Props = {
  nextStage: () => void
}

export interface IProfileImg {
  data: File
  preview: string
}

const OnboardingStage0: React.FC<OnboardingStage0Props> = ({ nextStage }) => {
  const { getText } = useContext(LangContext)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [profileImage, setProfileImage] = useState<IProfileImg>({
    data: new File([], BasicProfileImg),
    preview: BasicProfileImg
  })
  const body = 'Bip Bop 🤖'

  useEffect(() => {
    localStorage.setItem('onboardingStage', '0')
    handleUrlParamsErrors(getText)
  }, [getText])

  const handleNextStage = (intention: Intention) => {
    localStorage.setItem('onboardingIntention', intention)
    nextStage()
  }

  return (
    <>
      <div className="onboarding-stage onboarding-stage-0 bg-pattern">
        <Logo homeLink={false} />
        <PageTitle title="onboarding.0.title" description="onboarding.0.description" />

        <div className="component-content">
          <BotDataForm
            setName={setName}
            setUsername={setUsername}
            previewImg={profileImage.preview}
            setProfileImg={setProfileImage}
            nextStage={() => handleNextStage('signup')}
          />

          <Tweet bot={{ name, username, profileImage: profileImage.preview }} body={body} />
        </div>
        <p className="already-registered-link">
          {getText('already.registered.question')}
          <span onClick={() => handleNextStage('login')}>
            {getText('already.registered.login')}
          </span>
        </p>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default OnboardingStage0
