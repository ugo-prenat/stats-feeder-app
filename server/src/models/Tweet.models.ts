import mongoose, { Document, Schema } from 'mongoose'

export interface ITweet {
  bot: string
  content: string
  twitterUrl: string
}

export interface ITweetModel extends ITweet, Document {}

const TweetSchema = new Schema(
  {
    bot: { type: Schema.Types.ObjectId, ref: 'Bot' },
    content: { type: String, required: true },
    tweetUrl: { type: String, required: true },
    pictures: [String]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default mongoose.model<ITweetModel>('Tweet', TweetSchema)
