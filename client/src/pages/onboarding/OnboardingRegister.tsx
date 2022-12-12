import React, { useCallback, useContext, useEffect } from 'react'
import Logo from '../../components/Logo'
import { LangContext } from '../../components/providers/LangContextProvider'
import { ThemeContext } from '../../components/providers/ThemeContextProvider'
import { IResponseStreamer } from '../../models/streamer.model'
import { req } from '../../utils/request'
import { Intention } from './onboardingModels'

const OnboardingRegister: React.FC = () => {
  const { setThemeClassName } = useContext(ThemeContext)
  const { getText } = useContext(LangContext)

  const twitchToken = document.location.hash.split('&')[0].split('=')[1]
  const botId = localStorage.getItem('botId')
  const intention = localStorage.getItem('intention') as Intention | null

  const returnToStage = useCallback((stageId: number, urlParam: string | null) => {
    if (stageId === 0) localStorage.removeItem('botId')
    localStorage.removeItem('streamerId')
    localStorage.setItem('onboardingStage', stageId.toString())
    window.location.href = `/onboarding${urlParam ? `?err=${urlParam}` : ''}`
  }, [])

  useEffect(() => {
    req<IResponseStreamer>('POST', '/streamers', { twitchToken, botId })
      .then(res => {
        if (!res.streamer) return returnToStage(1, setUrlParams(res))

        //
        // set streamer in streamer context provider
        //

        localStorage.setItem('streamerId', res.streamer._id)
        localStorage.setItem('onboardingStage', '2')
        window.location.href = '/onboarding'
      })
      .catch(res => returnToStage(1, setUrlParams(res)))
  }, [botId, returnToStage, twitchToken])

  return (
    <>
      <div className={`${setThemeClassName('main-component')} fullscreen-component`}>
        <Logo homeLink={false} />
        <p className="loading">{getText('registration')}</p>
      </div>
    </>
  )
}

const setUrlParams = (res: IResponseStreamer) => {
  const msg = res.error?.message

  if (msg === 'no bot linked to streamer') return `no_bot_linked&streamer=${res.error.streamer}`
  if (msg === 'no streamer found in twitch api') return 'twitch_api'
  if (msg === 'no streamer found in db') return 'not_found'
  return 'streamer'
}

export default OnboardingRegister
