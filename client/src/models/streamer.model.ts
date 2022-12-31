import { IBot } from './bot.model'
import { Roles } from './models'

export interface IStreamer {
  _id: string
  bot: IBot
  jwt: string
  token: string
  twitchId: number
  name: string
  username: string
  profileImageUrl: string
  email: string
  broadcasterType: TwitchbroadcasterType
  role: Roles
  isPremium: boolean
}
export interface IAPIStreamer extends IStreamer {
  createdAt?: string
  updatedAt?: string
}
export interface IResponseStreamer {
  streamer?: IAPIStreamer
  bot?: IBot
  error?: string
}
export type TwitchbroadcasterType = 'partner' | 'affiliate' | ''
