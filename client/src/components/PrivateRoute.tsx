import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StreamerContext } from './providers/StreamerContextProvider';

const PrivateRoute:React.FC = () => {
  const { streamer } = useContext(StreamerContext);
  console.log(streamer);
  
  return streamer.isAuth ? <Outlet /> : <Navigate to="/onboarding" />
}
export default PrivateRoute;