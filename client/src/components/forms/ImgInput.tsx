import React, { useContext, useState } from 'react';
import { LangContext } from '../providers/LangContextProvider';
import { ThemeContext } from '../providers/ThemeContextProvider';
import { MdAddAPhoto as AddPhotoIcon } from 'react-icons/md';
import { request } from '../../utils/request';

type ImgInputProps = {
  value: string,
  imgUrl: string,
  setProfileImg: (url: string) => void,
};

const ImgInput:React.FC<ImgInputProps> = ({ value, imgUrl, setProfileImg }) => {
  const { getText } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  const [img, setImg] = useState(imgUrl);
  const isLoading = false;
  
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files
    const formData = new FormData();
    if (images) Array.from(images).map(img => formData.append("files", img))
    
    const res = await request('POST', '/uploadds', {formData})
    const tempRes = 'https://pbs.twimg.com/profile_images/1586351236139388930/F-UiT4xl_400x400.jpg'
    console.log(res);
    setImg(tempRes)
    setProfileImg(tempRes)
  }
  
  return <div className='img-input-min-heigth'>
    <div className='profile-picture-container'>
      <div className='profile-picture-wrapper'>
        <img src={img} alt='bot avatar' />
      </div>
      <input
        type='file'
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleChange}
        id='avatar-upload'
      />
      <label htmlFor='avatar-upload' className={`${setThemeClassName('label')} ${isLoading ? 'importing' : ''}`}>
        { isLoading ? getText('loading') : getText(value) }
      </label>
      <label htmlFor='avatar-upload' className='add-photo'>
        {/* { isLoading ? getText('loading') : getText(value) } */}
        <AddPhotoIcon />
      </label>
    </div>
  </div>
}
export default ImgInput;