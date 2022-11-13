import Input from '../../components/forms/Input';
import ImgInput from '../../components/forms/ImgInput';
import PrimaryBtn from '../../components/buttons/PrimaryBtn';
import { FiArrowRight as RightArrowIcon } from 'react-icons/fi';
import TwitterUsernameInput from '../../components/forms/TwitterUsernameInput';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type BotDataFormProps = {
  setName: (name: string) => void,
  setUsername: (username: string) => void,
  profileImg: string,
  setProfileImg: (profileImg: string) => void,
}

export type BotDataFormValues = {
  name: string,
  username: string,
  profileImg: string,
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required('input.name.error.required'),
    username: yup.string().required('input.username.error.required'),
    profileImg: yup.string(),
  })
  .required();

const BotDataForm:React.FC<BotDataFormProps> = ({ setName, setUsername, profileImg, setProfileImg }) => {
  const { control,handleSubmit, setError, formState: { errors }} = useForm<BotDataFormValues>({ resolver: yupResolver(schema) });
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const onSubmit = handleSubmit(data => {
    setIsSubmitting(true)
    console.log(data);
  })
  
  return <form onSubmit={onSubmit}>
    <Controller control={control} name='name' render={({ field: {onChange, value} }) => (
      <Input
        label={'label.name'}
        value={value}
        onChange={(e) => {
          setName(e.currentTarget.value)
          onChange(e.currentTarget.value)
        }}
        error={errors.name?.message}
      />
    )} />
    <Controller control={control} name='username' render={({ field: {onChange, value} }) => (
      <TwitterUsernameInput
        username={value}
        setUsername={(e) => {
          setUsername(e.currentTarget.value)
          onChange(e.currentTarget.value)
        }}
        error={errors.username?.message}
        setError={setError}
      />
    )} />
    <Controller control={control} name='profileImg' render={({ field: {onChange} }) => (
      <ImgInput
        value={'label.profilePicture'}
        imgUrl={profileImg}
        setProfileImg={(url) => {
          setProfileImg(url)
          onChange(url)
        }}
      />
    )} />
    <PrimaryBtn
      text='btn.nextStep'
      icon={<RightArrowIcon />}
      iconPosition='right'
      disabled={isSubmitting}
    />
  </form>
}

export default BotDataForm;