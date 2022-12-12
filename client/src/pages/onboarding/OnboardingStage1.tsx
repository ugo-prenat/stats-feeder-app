import React, { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import TwitchLoginBtn from '../../components/buttons/TwitchLoginBtn'
import Logo from '../../components/Logo'
import PageTitle from '../../components/PageTitle'
import { LangContext } from '../../components/providers/LangContextProvider'
import TwitchXTwitterLogo from '../../components/TwitchXTwitterLogo'
import { handleUrlParamsErrors } from './onboardingActions'

const OnboardingStage1: React.FC = () => {
  const { getText } = useContext(LangContext)

  useEffect(() => {
    localStorage.setItem('onboardingStage', '1')
    handleUrlParamsErrors(getText)
  }, [getText])

  return (
    <>
      <div className="onboarding-stage onboarding-stage-1">
        <Logo homeLink={false} />
        <PageTitle title="onboarding.1.title" description="onboarding.1.description" />

        <div className="component-content">
          <TwitchLoginBtn />
          <TwitchXTwitterLogo />
        </div>
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
export default OnboardingStage1
