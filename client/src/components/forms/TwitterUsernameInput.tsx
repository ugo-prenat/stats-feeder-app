import React from 'react'
import { UseFormSetError } from 'react-hook-form'
import { BotDataFormValues } from '../../pages/onboarding/BotDataForm'
import { req } from '../../utils/request'
import Input from './Input'

type TwitterUsernameInputProps = {
  username: string
  setUsername: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  setError: UseFormSetError<BotDataFormValues>
}

const TwitterUsernameInput: React.FC<TwitterUsernameInputProps> = ({
  username,
  setUsername,
  error,
  setError
}) => {
  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.currentTarget.value
    setUsername(e)
    const res = await req('POST', '/twitter/available/username', { username: newUsername })

    setError('username', {
      type: 'manual',
      message: setResponseError(res, newUsername)
    })
  }
  return (
    <Input
      label={'label.username'}
      value={username}
      onChange={handleUsernameChange}
      error={error}
    />
  )
}

const setResponseError = (res: any, username: string): string | undefined => {
  if (username === '') return undefined
  if (username.length < 5) return 'input.error.username.tooShort'
  if (username.length > 15) return 'input.error.username.tooLong'
  if (res.error) return 'input.error.username.invalidInput'
  if (res.message.data || res.message.errors[0].detail.includes('User has been suspended'))
    return 'input.error.username.userTaken'

  return undefined
}

export default TwitterUsernameInput
