import mongoose, { Document, Schema } from 'mongoose'
import { TwitchbroadcasterType } from '../models'
import { IBot } from './Bot.models'

export interface IStreamer {
  bot: IBot
  jwt: string
  twitchToken: string
  twitchId: number
  name: string
  username: string
  profileImageUrl: string
  email: string
  broadcasterType: TwitchbroadcasterType
  role: string
  isPremium: boolean
}
export interface IMongoStreamer extends IStreamer {
  _id: string
}

export interface IStreamerModel extends IStreamer, Document {}

const StreamerSchema = new Schema(
  {
    bot: { type: Schema.Types.ObjectId, ref: 'Bot', required: true },
    jwt: { type: String, required: true },
    twitchToken: { type: String, required: true },
    twitchId: { type: Number, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    email: { type: String, required: true },
    broadcasterType: { type: String, required: false },
    role: { type: String, required: true },
    isPremium: { type: Boolean, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model<IStreamerModel>('Streamer', StreamerSchema)
