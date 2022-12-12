import { Response } from 'express'
import Streamer, { IMongoStreamer } from '../models/Streamer.models'
import Bot from '../models/Bot.models'
import fetch from 'node-fetch'
import Logging from '../utils/Logging'
import mongoose from 'mongoose'
import { TwitchbroadcasterType } from '../models'
import { IMongoBot } from '../models/Bot.models'
import { linkStreamerToBot } from './Bot.actions'

interface ICreateStreamerData {
  botId: string
  twitchToken: string
  twitchId: string
  name: string
  username: string
  profileImageUrl: string
  email: string
  broadcasterType: TwitchbroadcasterType
}

export const createNewStreamer = (res: Response, data: ICreateStreamerData) => {
  const { botId, twitchToken, twitchId, name, username, profileImageUrl, email, broadcasterType } =
    data

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
    .then(async streamer => {
      linkStreamerToBot(botId, streamer._id)
        .then(() => res.status(201).json({ streamer }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

export const loginStreamer = async (res: Response, streamer: IMongoStreamer) => {
  const bot = await getBotByStreamerId(streamer._id)
  bot
    ? res.status(200).json({ bot })
    : res
        .status(500)
        .json({ error: { message: 'no bot linked to streamer', streamer: streamer.name } })
}

export const getTwitchUser = async (twitchToken: string) => {
  let err = false
  const data = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID || '',
      Authorization: `Bearer ${twitchToken}`
    }
  })
    .then(res => res.json())
    .then(res => res.data[0])
    .catch(() => (err = true))

  if (err || !data) Logging.error('Error fetching twitch user')

  return {
    error: err || !data ? 'Error fetching twitch user' : null,
    twitchUser:
      !err && data
        ? {
            twitchId: data.id,
            name: data.display_name,
            username: data.login,
            profileImageUrl: data.profile_image_url,
            email: data.email,
            broadcasterType: data.broadcaster_type
          }
        : null
  }
}
export const getStreamerByTwitchId = async (twitchId: string): Promise<IMongoStreamer | null> => {
  return await Streamer.findOne({ twitchId })
}

export const getBotByStreamerId = async (streamerId: string): Promise<IMongoBot | null> => {
  return await Bot.findOne({ streamer: streamerId })
}
