import React from 'react'
import { IBot } from '../models/bot.model'

type BotProps = {
  bot: IBot
}

const Bot: React.FC<BotProps> = ({ bot }) => {
  return (
    <div className="bot">
      <div className="name">{bot.name}</div>
      <div className="name">{bot.username}</div>
    </div>
  )
}
export default Bot
