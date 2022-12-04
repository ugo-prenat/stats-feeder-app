import { IStreamer } from './streamer.model'

export interface IBot {
  _id: string
  name: string
  username: string
  profileImageUrl: string
  status: string
  streamer?: IStreamer
  phoneNumber?: number
}
export interface IAPIBot extends IBot {
  updatedAt: string
  createdAt: string
}
export interface IResponseBot {
  bot?: IAPIBot
  message?: string
  error?: any
}
