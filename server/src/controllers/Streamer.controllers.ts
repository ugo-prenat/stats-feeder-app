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

  const { error, twitchId, name, username, profileImageUrl, email, broadcasterType } =
    await getTwitchUser(twitchToken)

  if (error) return res.status(500).json({ error })

  const streamer = await getStreamerByTwitchId(twitchId)

  console.log(streamer)

  if (streamer) return loginStreamer(res, streamer)

  createNewStreamer(res, {
    botId,
    twitchToken,
    twitchId,
    name,
    username,
    profileImageUrl,
    email,
    broadcasterType
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
