import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './providers/AuthContextProvider'
import { getStreamerById } from '../pages/onboarding/onboardingActions'
import FullScreenLoading from './loading/FullScreenLoading'

type callStatus = 'loading' | 'success' | 'error'

const PrivateRoute: React.FC = () => {
  const { setStreamer, setBot } = useContext(AuthContext)
  const [callStatus, setCallStatus] = useState<callStatus>('loading')

  useEffect(() => {
    setCallStatus('loading')

    const checkAuth = async () => {
      const streamerId = localStorage.getItem('streamerId')
      await getStreamerById(streamerId).then(res => {
        if (res.streamer && res.streamer.bot) {
          setStreamer(res.streamer)
          setBot(res.streamer.bot)

          localStorage.removeItem('onboardingIntention')
          localStorage.removeItem('onboardingError')
          localStorage.removeItem('onboardingStage')

          setCallStatus('success')
        } else {
          localStorage.setItem('onboardingError', 'login.error')
          localStorage.removeItem('onboardingStage')
          setCallStatus('error')
        }
      })
    }
    checkAuth()
  }, [setBot, setStreamer])

  return (
    <>
      {callStatus === 'loading' && <FullScreenLoading />}
      {callStatus === 'error' && <Navigate to="/onboarding" />}
      {callStatus === 'success' && <Outlet />}
    </>
  )
}
export default PrivateRoute
