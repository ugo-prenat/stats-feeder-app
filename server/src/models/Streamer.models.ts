import mongoose, { Document, Schema } from 'mongoose'

export interface IStreamer {
  bot: string
  token: string
  twitchId: number
  name: string
  username: string
  profileImageUrl: string
  email: string
  role: string
  isPremium: boolean
}

export interface IStreamerModel extends IStreamer, Document {}

const StreamerSchema = new Schema(
  {
    bot: { type: Schema.Types.ObjectId, ref: 'Bot', required: true },
    token: { type: String, required: true },
    twitchId: { type: Number, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    isPremium: { type: Boolean, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model<IStreamerModel>('Streamer', StreamerSchema)
