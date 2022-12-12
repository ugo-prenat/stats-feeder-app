import { DEFAULT_BOT_PROFILE_IMG_URL } from '../constant'
import Bot from '../models/Bot.models'

export const setProfileImg = (files: Express.Multer.File[]) => {
  if (files) return `${process.env.BACKEND_URL}/uploads/${files[0]?.filename}`
  return process.env.BACKEND_URL + DEFAULT_BOT_PROFILE_IMG_URL
}
export const linkStreamerToBot = async (botId: string, streamerId: string) => {
  return await Bot.findByIdAndUpdate(botId, { streamer: streamerId }, { new: true })
}
