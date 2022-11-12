import React, { useContext, useState } from 'react';
import UseFetch from '../../hooks/UseFetch';
import { LangContext } from '../providers/LangContextProvider';
import { ThemeContext } from '../providers/ThemeContextProvider';
import { MdAddAPhoto as AddPhotoIcon } from 'react-icons/md';

type ImgInputProps = {
  value: string,
  imgUrl: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const ImgInput:React.FC<ImgInputProps> = ({ value, imgUrl, onChange }) => {
  const { getText } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  const [img, setImg] = useState(imgUrl);
  const isLoading = false;
  
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.currentTarget.files
    const formData = new FormData();
    if (images) Array.from(images).map(img => formData.append("files", img))
    
    const [ res, error, isLoading ] = UseFetch('POST', '/uploads', formData)
    console.log(res);
    
  }
  
  return <div className='profile-picture-container'>
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
}
export default ImgInput;