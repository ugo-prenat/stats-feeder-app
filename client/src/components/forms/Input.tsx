import React, { useContext } from 'react';
import { LangContext } from '../providers/LangContextProvider';
import { ThemeContext } from '../providers/ThemeContextProvider';

type InputProps = {
  type?: string,
  label: string,
  value?: string,
  error?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const Input:React.FC<InputProps> = ({ type='text', label, value, error, onChange }) => {
  const { getText } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);
  const setThemeClassName = (className: string) => `${className}${theme === 'light' ? ` ${className}-light`: ''}`;
  
  return <div className={`${setThemeClassName('input-group')} ${error ? 'error' : ''}`}>
    <input
      type={type}
      placeholder=' '
      value={value ? value : ''}
      onChange={onChange}
    />
    <label>{getText(label)}</label>
    { error && <span className='error-msg'>{getText(error)}</span> }
    
  </div>
}

export default Input;