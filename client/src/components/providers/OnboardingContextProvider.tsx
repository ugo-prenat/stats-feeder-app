import React, { createContext, ReactNode, useState } from 'react'
import { IBot } from '../../models/bot.model'

type OnboardingContextProviderProps = {
  children: ReactNode
}

export type Intention = 'login' | 'signup'

interface IOnboardingContext {
  intention?: Intention
  streamerId?: string
  bot?: IBot
  setIntention: (intention: Intention) => void
  setStreamerId: (streamerId: string) => void
  setBot: (bot: IBot) => void
}

export const OnboardingContext = createContext<IOnboardingContext>({
  setIntention: () => {},
  setStreamerId: () => {},
  setBot: () => {}
})

const OnboardingContextProvider: React.FC<OnboardingContextProviderProps> = ({ children }) => {
  const [intention, setIntention] = useState<Intention>()
  const [streamerId, setStreamerId] = useState<string>()
  const [bot, setBot] = useState<IBot>()

  return (
    <OnboardingContext.Provider
      value={{
        intention,
        streamerId,
        bot,
        setIntention,
        setStreamerId,
        setBot
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export default OnboardingContextProvider
