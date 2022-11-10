import React, { useContext } from 'react';
import { LangContext } from './providers/LangContextProvider';

type TweetProps = {
  bot: {
    name: string,
    username: string,
    profileImageUrl: string,
  },
  body: string,
  pictures?: string[],
};
type BotDataProps = {
  name: string,
  username: string,
  profileImageUrl: string,
}

const Tweet:React.FC<TweetProps> = ({ bot, body, pictures }: TweetProps) => {
  
  return <div className='tweet'>
    <BotData
      name={bot.name}
      username={bot.username}
      profileImageUrl={bot.profileImageUrl}
    />
    <div className="body">{body}</div>
  </div>
}

const BotData: React.FC<BotDataProps> = ({ name, username, profileImageUrl }: BotDataProps) => {
  const { getText } = useContext(LangContext)
  
  return <div className='bot-data'>
    <img src={profileImageUrl} alt={`${username}-logo`} />
    <div>
      <p className='name'>{name}</p>
      <p className='username'>@{username}</p>
      <p className='automated'><RobotIcon /> {getText('automated')}</p>
    </div>
  </div>
}

const RobotIcon: React.FC = () => {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className='robot-icon'>
    <g>
      <path d="M.998 15V9h2v6h-2zm22 0V9h-2v6h2zM12 2c-4.418 0-8 3.58-8 8v7c0 2.76 2.239 5 5 5h6c2.761 0 5-2.24 5-5v-7c0-4.42-3.582-8-8-8zM8.998 14c-1.105 0-2-.9-2-2s.895-2 2-2 2 .9 2 2-.895 2-2 2zm6 0c-1.104 0-2-.9-2-2s.895-2 2-2 2 .9 2 2-.896 2-2 2z">
      </path>
    </g>
  </svg>
}

export default Tweet;