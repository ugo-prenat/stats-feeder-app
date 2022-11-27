import dotenv from 'dotenv'
dotenv.config()
import { TwitterApi } from 'twitter-api-v2'

const TwitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || '')

export const Tclient = TwitterClient.readWrite.v2
export const TclientV1 = TwitterClient.readWrite.v1
