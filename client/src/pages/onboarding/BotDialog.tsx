import { useContext } from 'react'
import { IBot } from '../../models/bot.model'
import { LangContext } from '../../components/providers/LangContextProvider'
import { Intention } from '../../components/providers/OnboardingContextProvider'
import Bot from '../../components/Bot'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'

type BotDialogProps = {
  bot: IBot
}

const BotDialog: React.FC<BotDialogProps> = ({ bot }) => {
  const { getText } = useContext(LangContext)
  const { setThemeClassName } = useContext(ThemeContext)
  const intention = localStorage.getItem('onboardingIntention') as Intention | 'signup'

  return (
    <div className="dialog-wrapper">
      <div className={`${setThemeClassName('dialog-container')}`}>
        <p className="title">
          {getText(intention === 'login' ? 'login intention' : 'signup intention')}
        </p>
        <p className="description">
          {getText(
            intention === 'login' ? 'login intention description' : 'signup intention description'
          )}
        </p>
        <Bot bot={bot} className="bot" />
      </div>
    </div>
  )
}

export default BotDialog
