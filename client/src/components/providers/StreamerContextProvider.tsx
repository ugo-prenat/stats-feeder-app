import React, { createContext, useState } from 'react'
import { IFrontStreamer } from '../../models/streamer.model'

type StreamerContextProviderProps = {
  children: React.ReactNode
}
interface IStreamerContext {
  streamer: IFrontStreamer
  setStreamer: React.Dispatch<React.SetStateAction<IFrontStreamer>>
}

const defaultStreamer = {} as IFrontStreamer
export const StreamerContext = createContext<IStreamerContext>({
  streamer: defaultStreamer,
  setStreamer: () => {}
})

const StreamerContextProvider: React.FC<StreamerContextProviderProps> = ({ children }) => {
  const [streamer, setStreamer] = useState(defaultStreamer)

  return (
    <StreamerContext.Provider value={{ streamer, setStreamer }}>
      {children}
    </StreamerContext.Provider>
  )
}
export default StreamerContextProvider
