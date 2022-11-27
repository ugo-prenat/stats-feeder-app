import mongoose, { Document, Schema } from 'mongoose'

export interface IBot {
  streamer?: string
  name: string
  username: string
  profileImageUrl: string
  phoneNumber: number
  status: 'pending' | 'active' | 'inactive'
}

export interface IBotModel extends IBot, Document {}

const BotSchema = new Schema(
  {
    streamer: { type: Schema.Types.ObjectId, ref: 'Streamer', required: false },
    name: { type: String, required: true },
    username: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    phoneNumber: { type: Number, required: false },
    status: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model<IBotModel>('Bot', BotSchema)
