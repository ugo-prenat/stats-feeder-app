import mongoose, { Document, Schema } from "mongoose";

export interface IBot {
  streamer: string;
  name: string;
  username: string;
  status: 'pending' | 'active' | 'inactive';
}

export interface IBotModel extends IBot, Document {}

const BotSchema = new Schema(
  {
    streamer: { type: Schema.Types.ObjectId, ref: "Streamer", required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model<IBotModel>("Bot", BotSchema);