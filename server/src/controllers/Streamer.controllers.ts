import { Request, Response } from 'express'
import Streamer from '../models/Streamer.models'
import {
  createNewStreamer,
  getTwitchUser,
  getStreamerByTwitchId,
  loginStreamer
} from '../actions/Streamers.action'

const createStreamer = async (req: Request, res: Response) => {
  const { botId, twitchToken } = req.body

  // Search streamer in twitch api
  const { error, twitchUser } = await getTwitchUser(twitchToken)
  if (error || !twitchUser)
    return res.status(500).json({ error: { message: 'no streamer found in twitch api' } })

  // Search streamer in db
  const streamer = await getStreamerByTwitchId(twitchUser.twitchId)
  if (!streamer && !botId)
    return res.status(500).json({ error: { message: 'no streamer found in db' } })

  // Streamer already exist in db, login
  if (streamer && !botId) return loginStreamer(res, streamer)

  // Finally, create a new streamer
  createNewStreamer(res, {
    botId,
    twitchToken,
    twitchId: twitchUser.twitchId,
    name: twitchUser.name,
    username: twitchUser.username,
    profileImageUrl: twitchUser.profileImageUrl,
    email: twitchUser.email,
    broadcasterType: twitchUser.broadcasterType
  })
}
const getStreamer = (req: Request, res: Response) => {
  const { id } = req.params
  return Streamer.findById(id)
    .populate('bot')
    .then(streamer =>
      streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' })
    )
    .catch(error => res.status(500).json({ error }))
}
const getAllStreamer = (req: Request, res: Response) => {
  return Streamer.find()
    .populate('bot')
    .then(streamers => res.status(200).json({ streamers }))
    .catch(error => res.status(500).json({ error }))
}
const updateStreamer = (req: Request, res: Response) => {
  const { id } = req.params
  return Streamer.findByIdAndUpdate(id, req.body, { new: true })
    .then(streamer =>
      streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' })
    )
    .catch(error => res.status(500).json({ error }))
}
const deleteStreamer = (req: Request, res: Response) => {
  const { id } = req.params
  return Streamer.findByIdAndDelete(id)
    .then(streamer =>
      streamer
        ? res.status(200).json({ streamer })
        : res.status(404).json({ message: 'Streamer not found' })
    )
    .catch(error => res.status(500).json({ error }))
}

export default {
  createStreamer,
  getStreamer,
  getAllStreamer,
  updateStreamer,
  deleteStreamer
}
