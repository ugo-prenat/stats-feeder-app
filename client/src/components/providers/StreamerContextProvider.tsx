import React, { createContext, useState } from 'react'
import { IStreamer } from '../../models/streamer.model'
import { IBot } from '../../models/bot.model'

type AuthContextProviderProps = {
  children: React.ReactNode
}
interface IAuthContext {
  streamer?: IStreamer
  bot?: IBot
  setStreamer: (streamer: IStreamer) => void
  setBot: (bot: IBot) => void
}

export const AuthContext = createContext<IAuthContext>({
  setStreamer: () => {},
  setBot: () => {}
})

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [streamer, setStreamer] = useState<IStreamer>()
  const [bot, setBot] = useState<IBot>()

  return (
    <AuthContext.Provider value={{ streamer, bot, setStreamer, setBot }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
