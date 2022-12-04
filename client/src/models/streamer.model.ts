import { Roles } from './model'

export interface IStreamer {
  _id: string
  bot: string
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
  createdAt: string
  updatedAt: string
}
export interface IFrontStreamer extends IStreamer {
  isAuth: boolean
}
export interface IResponseStreamer {
  streamer?: IAPIStreamer
  message?: string
  error?: any
}
export type TwitchbroadcasterType = 'partner' | 'affiliate' | ''
