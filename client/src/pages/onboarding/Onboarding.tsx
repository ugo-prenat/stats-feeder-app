import React, { useCallback, useContext, useEffect, useState } from 'react'
import FullScreenLoading from '../../components/loading/FullScreenLoading'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import OnboardingStage0 from './OnboardingStage0'
import OnboardingStage1 from './OnboardingStage1'
import OnboardingStage2 from './OnboardingStage2'
import { displayCorrectStage } from './onboardingActions'
import { ToastContainer, toast } from 'react-toastify'
import { LangContext } from '../../components/providers/LangContextProvider'

const Onboarding: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  const [stage, setStage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleErrors = useCallback(() => {
    const error = localStorage.getItem('onboardingError')
    if (error) {
      toast.error(getText(error))
      localStorage.removeItem('onboardingError')
    }
  }, [getText])

  useEffect(() => {
    displayCorrectStage(setStage).then(() => {
      handleErrors()
      setIsLoading(false)
    })
  }, [getText, handleErrors])

  if (isLoading) return <FullScreenLoading label="loading" />

  return (
    <>
      <div
        className={`${setThemeClassName(
          'main-component'
        )} fullscreen-component onboarding-component`}
      >
        {stage === 0 && <OnboardingStage0 nextStage={() => setStage(1)} />}
        {stage === 1 && <OnboardingStage1 goBack={() => setStage(0)} />}
        {stage === 2 && <OnboardingStage2 />}
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

export default Onboarding
