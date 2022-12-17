import React, { useContext, useState } from 'react'
import { LangContext } from '../providers/LangContextProvider'
import { ThemeContext } from '../providers/ThemeContextProvider'
import { MdAddAPhoto as AddPhotoIcon } from 'react-icons/md'
import { IProfileImg } from '../../pages/onboarding/OnboardingStage0'
import { UseFormSetError } from 'react-hook-form'
import { BotDataFormValues } from '../../pages/onboarding/BotDataForm'
import { MAX_FILE_SIZE } from '../../constant'

type ImgInputProps = {
  value: string
  preview: string
  setProfileImg: ({ data, preview }: IProfileImg) => void
  error?: string
  setError: UseFormSetError<BotDataFormValues>
}

const ImgInput: React.FC<ImgInputProps> = ({ value, preview, setProfileImg, error, setError }) => {
  const { getText } = useContext(LangContext)
  const { setThemeClassName } = useContext(ThemeContext)

  const [previewUrl, setPreviewUrl] = useState(preview)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files

    if (images) {
      if (images[0].size > MAX_FILE_SIZE) {
        return setError('profileImg', {
          type: 'manual',
          message: 'input.profileImg.error.size'
        })
      }

      setPreviewUrl(URL.createObjectURL(images[0]))
      setProfileImg({
        data: images[0],
        preview: URL.createObjectURL(images[0])
      })
    }
  }

  return (
    <div className="img-input-min-heigth">
      <div className="profile-picture-container">
        <div className="profile-picture-wrapper">
          <img src={previewUrl} alt="bot avatar" />
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleChange}
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className={setThemeClassName('label')}>
          {getText(value)}
        </label>
        <label htmlFor="avatar-upload" className="add-photo">
          <AddPhotoIcon />
        </label>
      </div>
      {error && <span className="error-msg">{getText(error)}</span>}
    </div>
  )
}
export default ImgInput
