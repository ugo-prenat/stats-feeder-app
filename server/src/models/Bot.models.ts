import mongoose, { Document, Schema } from "mongoose";

export interface IBot {
  streamer?: string;
  name: string;
  username: string;
  profileImageUrl: string;
  phoneNumber: Number;
  status: 'pending' | 'active' | 'inactive';
}

export interface IBotModel extends IBot, Document {}

const BotSchema = new Schema(
  {
    streamer: { type: Schema.Types.ObjectId, ref: "Streamer" },
    name: { type: String, required: true },
    username: { type: String, required: true },
    profileImageUrl: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default mongoose.model<IBotModel>("Bot", BotSchema);