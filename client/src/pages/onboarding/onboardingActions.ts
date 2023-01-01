import { req } from '../../utils/request'
import { IResponseBot } from '../../models/bot.model'
import { IAPIStreamer, IResponseStreamer, IStreamer } from '../../models/streamer.model'

export const displayCorrectStage = async (
  setStage: React.Dispatch<React.SetStateAction<number>>
) => {
  const stage = parseInt(localStorage.getItem('onboardingStage') || '0')
  const botId = localStorage.getItem('botId') || undefined
  const streamerId = localStorage.getItem('streamerId') || undefined

  const isCorrectBotId = botId ? await checkIsCorrectBotId(botId) : false
  const isCorrectStreamerId = streamerId ? await checkIsCorrectStreamerId(streamerId) : false

  if (stage === 0) {
    localStorage.removeItem('botId')
    localStorage.removeItem('streamerId')
    localStorage.removeItem('onboardingIntention')
  }
  if (stage === 2 && (!isCorrectBotId || !isCorrectStreamerId)) {
    console.log({ isCorrectBotId, isCorrectStreamerId })

    localStorage.removeItem('botId')
    localStorage.removeItem('streamerId')
    localStorage.removeItem('onboardingIntention')
    localStorage.setItem('onboardingError', 'login.error')
    return setStage(0)
  }
  return setStage(stage)
}
export const registerStreamer = async (twitchToken: string, botId: string | null) => {
  return await req<IResponseStreamer>('POST', '/streamers', { twitchToken, botId })
}
export const getStreamerById = async (streamerId: string | null) => {
  return await req<IResponseStreamer>('GET', `/streamers/${streamerId}`)
}
const checkIsCorrectBotId = async (botId: string): Promise<boolean> => {
  return req<IResponseBot>('GET', `/bots/${botId}`).then(res => (res.bot ? true : false))
}
const checkIsCorrectStreamerId = async (streamerId: string): Promise<boolean> => {
  return req<IResponseStreamer>('GET', `/streamers/${streamerId}`).then(res =>
    res.streamer ? true : false
  )
}
export const makeStreamerFromApiToDefault = (streamer: IAPIStreamer) => {
  delete streamer.createdAt
  delete streamer.updatedAt
  return streamer as IStreamer
}
