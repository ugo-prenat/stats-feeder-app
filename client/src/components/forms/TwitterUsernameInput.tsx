import React, { useState } from 'react';
import { request } from '../../utils/request';
import Input from './Input';

type TwitterUsernameInputProps = {
  username: string,
  setUsername: (username: string) => void,
};

const TwitterUsernameInput:React.FC<TwitterUsernameInputProps> = ({ username, setUsername }) => {
  const [err, setErr] = useState<string | undefined>()
  
  const handleUsernameChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.currentTarget.value
    setUsername(newUsername)
    const res = await request('POST', '/twitter/available/username', {username: newUsername})
    
    setErr(getResponseError(res, newUsername))
  }
  return <Input
    label={'label.username'}
    value={username}
    onChange={handleUsernameChange}
    error={err}
  />
}

const getResponseError = (res: any, username: string): string | undefined => {
  if (username === '') return undefined
  if (username.length < 5) return 'input.error.username.tooShort'
  if (res.error) return 'input.error.username.invalidInput'
  if (res.message.data || res.message.errors[0].detail.includes('User has been suspended')) return 'input.error.username.userTaken'

  return undefined
}

export default TwitterUsernameInput;