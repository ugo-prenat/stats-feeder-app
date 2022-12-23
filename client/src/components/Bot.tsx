import React from 'react'
import { IBot } from '../models/bot.model'
import Img from './Img'

type BotProps = {
  bot: IBot
  className?: string
}

const Bot: React.FC<BotProps> = ({ bot, className }) => {
  return (
    <div className={`bot-component${className ? ` ${className}` : ''}`}>
      <Img src={bot.profileImageUrl} alt={`${bot.username}-avatar`} className="test-class" />
      <div className="names">
        <p className="name">{bot.name}</p>
        <p className="username">@{bot.username}</p>
      </div>
    </div>
  )
}
export default Bot
