import React, { useCallback, useContext, useEffect } from 'react'
import Logo from '../../components/Logo'
import { LangContext } from '../../components/providers/LangContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import { IResponseStreamer } from '../../models/streamer.model'
import { req } from '../../utils/request'
import { ToastContainer, toast } from 'react-toastify'

const OnboardingRegister: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  const twitchToken = document.location.hash.split('&')[0].split('=')[1]
  const botId = localStorage.getItem('botId')

  const returnToStage = useCallback(
    (stageId: number) => {
      toast.error(getText('request.error'))
      setTimeout(() => {
        if (stageId === 0) localStorage.removeItem('botId')
        localStorage.removeItem('streamerId')
        localStorage.setItem('onboardingStage', stageId.toString())
        window.location.href = '/onboarding'
      }, 2000)
    },
    [getText]
  )

  useEffect(() => {
    //if (!botId) return returnToStage(0)

    req<IResponseStreamer>('POST', '/streamers', { twitchToken, botId })
      .then(res => {
        if (!res.streamer) return returnToStage(1)

        //
        // set streamer in streamer context provider
        //

        localStorage.setItem('streamerId', res.streamer._id)
        localStorage.setItem('onboardingStage', '2')
        window.location.href = '/onboarding'
      })
      .catch(() => returnToStage(1))
  }, [botId, returnToStage, twitchToken])

  return (
    <>
      <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
        <Logo homeLink={false} />
        <p className="loading">{getText('registration')}</p>
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
export default OnboardingRegister
