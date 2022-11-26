import Input from '../../components/forms/Input'
import ImgInput from '../../components/forms/ImgInput'
import PrimaryBtn from '../../components/buttons/PrimaryBtn'
import { FiArrowRight as RightArrowIcon } from 'react-icons/fi'
import TwitterUsernameInput from '../../components/forms/TwitterUsernameInput'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IProfileImg } from './OnboardingStage0'
import { request } from '../../utils/request'
import { IAPIBot } from '../../models/bot.model'

type BotDataFormProps = {
  setName: (name: string) => void
  setUsername: (username: string) => void
  previewImg: string
  setProfileImg: ({ data, preview }: IProfileImg) => void
  nextStage: () => void
}

export type BotDataFormValues = {
  name: string
  username: string
  profileImg: IProfileImg
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required('input.name.error.required'),
    username: yup.string().required('input.username.error.required'),
    profileImg: yup.object()
  })
  .required()

const BotDataForm: React.FC<BotDataFormProps> = ({
  setName,
  setUsername,
  previewImg,
  setProfileImg,
  nextStage
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<BotDataFormValues>({ resolver: yupResolver(schema) })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = handleSubmit((data) => {
    setIsSubmitting(true)
    const itContainsImg = data.profileImg !== undefined

    const formData = new FormData()
    if (itContainsImg) formData.append('files', data.profileImg.data)

    request('POST', `/bots?name=${data.name}&username=${data.username}`, formData, itContainsImg)
      .then((res) => {
        const bot: IAPIBot = res.bot
        localStorage.setItem('botId', bot._id)
        nextStage()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSubmitting(false))
  })

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label={'label.name'}
            value={value}
            onChange={(e) => {
              setName(e.currentTarget.value)
              onChange(e.currentTarget.value)
            }}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TwitterUsernameInput
            username={value}
            setUsername={(e) => {
              setUsername(e.currentTarget.value)
              onChange(e.currentTarget.value)
            }}
            error={errors.username?.message}
            setError={setError}
          />
        )}
      />
      <Controller
        control={control}
        name="profileImg"
        render={({ field: { onChange } }) => (
          <ImgInput
            value={'label.profilePicture'}
            preview={previewImg}
            setProfileImg={({ data, preview }: IProfileImg) => {
              setProfileImg({ data, preview })
              onChange({ data, preview })
            }}
            error={errors.profileImg?.message}
            setError={setError}
          />
        )}
      />
      <PrimaryBtn
        text="btn.nextStep"
        icon={<RightArrowIcon />}
        iconPosition="right"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default BotDataForm
