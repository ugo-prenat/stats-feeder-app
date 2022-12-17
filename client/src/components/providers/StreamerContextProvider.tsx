import React, { createContext, useState } from 'react'
import { IFrontStreamer } from '../../models/streamer.model'

type StreamerContextProviderProps = {
  children: React.ReactNode
}
interface IStreamerContext {
  streamer?: IFrontStreamer
  setStreamer: (streamer: IFrontStreamer) => void
}

export const StreamerContext = createContext<IStreamerContext>({
  setStreamer: () => {}
})

const StreamerContextProvider: React.FC<StreamerContextProviderProps> = ({ children }) => {
  const [streamer, setStreamer] = useState<IFrontStreamer>()

  return (
    <StreamerContext.Provider value={{ streamer, setStreamer }}>
      {children}
    </StreamerContext.Provider>
  )
}
export default StreamerContextProvider
