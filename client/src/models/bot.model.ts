import { IStreamer } from './streamer.model'

type Status = 'pending' | 'active' | 'inactive'

export interface IBot {
  _id: string
  name: string
  username: string
  profileImageUrl: string
  status: Status
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
