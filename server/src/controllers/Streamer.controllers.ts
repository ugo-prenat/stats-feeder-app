import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Streamer from '../models/Streamer.models'
import fetch from 'node-fetch'

const createStreamer = async (req: Request, res: Response) => {
  const { botId, twitchToken } = req.body

  const { twitchId, name, username, profileImageUrl, email, broadcasterType } = await getTwitchUser(
    twitchToken
  )

  const streamer = new Streamer({
    _id: new mongoose.Types.ObjectId(),
    bot: botId,
    jwt: 'temp jwt',
    twitchToken,
    twitchId,
    name,
    username,
    profileImageUrl,
    email,
    broadcasterType,
    role: 'user',
    isPremium: false
  })

  return streamer
    .save()
    .then(streamer => res.status(201).json({ streamer }))
    .catch(error => res.status(500).json({ error }))
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

const getTwitchUser = async (twitchToken: string) => {
  const data = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID || '',
      Authorization: `Bearer ${twitchToken}`
    }
  })
    .then(res => res.json())
    .then(res => res.data[0])

  return {
    twitchId: data.id,
    name: data.display_name,
    username: data.login,
    profileImageUrl: data.profile_image_url,
    email: data.email,
    broadcasterType: data.broadcaster_type
  }
}

export default {
  createStreamer,
  getStreamer,
  getAllStreamer,
  updateStreamer,
  deleteStreamer
}
