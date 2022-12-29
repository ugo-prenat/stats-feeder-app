import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './providers/AuthContextProvider'

const PrivateRoute: React.FC = () => {
  const { streamer, bot } = useContext(AuthContext)

  if (streamer && bot) return <Outlet />

  localStorage.setItem('onboardingError', 'login.error')
  localStorage.removeItem('onboardingStage')
  return <Navigate to="/onboarding" />
}
export default PrivateRoute
