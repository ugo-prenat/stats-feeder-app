import { req } from '../../utils/request'
import { IResponseBot } from '../../models/bot.model'
import { IResponseStreamer } from '../../models/streamer.model'

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
    localStorage.removeItem('botId')
    localStorage.removeItem('streamerId')
    localStorage.removeItem('onboardingIntention')
    localStorage.setItem('onboardingError', 'login.error')
    return setStage(0)
  }

  return setStage(stage)
}

const checkIsCorrectBotId = async (botId: string): Promise<boolean> => {
  return req<IResponseBot>('GET', `/bots/${botId}`).then(res => (res.bot ? true : false))
}
const checkIsCorrectStreamerId = async (streamerId: string): Promise<boolean> => {
  return req<IResponseStreamer>('GET', `/streamers/${streamerId}`).then(res =>
    res.streamer ? true : false
  )
}

/* export const setErrorMsg = (err: string, streamer: string, getText: (key: string) => string) => {
  switch (err) {
    case 'no_bot_linked':
      return `${getText('no.bot.linked.to.streamer')} '${streamer}'`
    case 'twitch_api':
      return getText('no.streamer.found.in.twitch.api')
    case 'not_found':
      return getText('no.streamer.found.in.db')
    default:
      return getText('request.error')
  }
} */
/* export const handleUrlParamsErrors = (getText: (key: string) => string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const err = urlParams.get('err')
  const streamer = urlParams.get('streamer')

  if (err) return toast.error(setErrorMsg(err, streamer || '', getText))
}
 */
