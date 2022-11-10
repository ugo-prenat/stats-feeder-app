import React, { createContext, useState } from 'react';
import { Streamer } from '../../models';

type StreamerContextProviderProps = {
  children: React.ReactNode;
};
interface IStreamerContext {
  streamer: Streamer,
  setStreamer: React.Dispatch<React.SetStateAction<Streamer>>,
}

const defaultStreamer: Streamer = {} as Streamer;
export const StreamerContext = createContext<IStreamerContext>({streamer: defaultStreamer, setStreamer: () => {} });

const StreamerContextProvider:React.FC<StreamerContextProviderProps> = ({ children }) => {
  const [streamer, setStreamer] = useState(defaultStreamer);
  
  return <StreamerContext.Provider value={{ streamer, setStreamer }}>
    {children}
  </StreamerContext.Provider>
  
}
export default StreamerContextProvider;