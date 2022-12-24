import React, { useContext } from 'react'
import { IBot } from '../models/bot.model'
import Img from './Img'
import { MdOutlineKeyboardArrowRight as RightArrowIcon } from 'react-icons/md'
import { ThemeContext } from './providers/ThemeContextProvider'

type BotProps = {
  bot: IBot
  className?: string
  onClick?: () => void
}

const Bot: React.FC<BotProps> = ({ bot, className, onClick }) => {
  const { setThemeClassName } = useContext(ThemeContext)

  return (
    <div
      className={`bot-component${className ? ` ${className}` : ''}${
        onClick ? ` ${setThemeClassName('clickable')}` : ''
      }`}
      onClick={onClick}
    >
      <div className="data">
        <Img src={bot.profileImageUrl} alt={`${bot.username}-avatar`} />
        <div className="names">
          <p className="name">{bot.name}</p>
          <p className="username">@{bot.username}</p>
        </div>
      </div>
      {onClick && <RightArrowIcon className="arrow-icon" />}
    </div>
  )
}
export default Bot
