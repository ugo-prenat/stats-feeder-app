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

  const handleLogin = () => {
    window.location.href = '/'
  }

  return (
    <div className="dialog-wrapper">
      <div className={`${setThemeClassName('dialog-container')}`}>
        <p className="title">
          {getText(
            intention === 'login' ? 'bot.dialog.login.intention' : 'bot.dialog.signup.intention'
          )}
        </p>
        <p className="description">
          {getText(
            intention === 'login'
              ? 'bot.dialog.login.intention.description'
              : 'bot.dialog.signup.intention.description'
          )}
        </p>
        <Bot bot={bot} onClick={handleLogin} />
      </div>
    </div>
  )
}

export default BotDialog
