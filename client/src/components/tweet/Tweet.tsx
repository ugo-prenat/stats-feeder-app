import React, { useContext } from 'react';
import Twemoji from 'react-twemoji';
import UseDate from '../../hooks/UseDate';
import { LangContext } from '../providers/LangContextProvider';
import BotData from './BotData';
import Buttons from './Buttons';

type TweetProps = {
  bot: {
    name: string,
    username: string,
    profileImageUrl: string,
  },
  body: string,
  pictures?: string[],
};

const Tweet:React.FC<TweetProps> = ({ bot, body, pictures }: TweetProps) => {
  const { getText } = useContext(LangContext);
  const date = UseDate()
  
  return <div className={'tweet'}>
    <BotData
      name={bot.name === '' ? getText('tweet.bot.name') : bot.name}
      username={bot.username === '' ? getText('tweet.bot.username') : bot.username}
      profileImageUrl={bot.profileImageUrl}
    />
    <div className="body">
      <Twemoji options={{ className: 'twemoji' }}>{body}</Twemoji>
    </div>
    <div className="date">{date}</div>
    <Buttons />
  </div>
}

export default Tweet;