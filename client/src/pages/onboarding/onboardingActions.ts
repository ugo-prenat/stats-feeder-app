import { toast } from 'react-toastify'

export const setErrorMsg = (err: string, streamer: string, getText: (key: string) => string) => {
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
}
export const handleUrlParamsErrors = (getText: (key: string) => string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const err = urlParams.get('err')
  const streamer = urlParams.get('streamer')

  if (err) return toast.error(setErrorMsg(err, streamer || '', getText))
}
