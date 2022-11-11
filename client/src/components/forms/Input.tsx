import React, { useContext } from 'react';
import { LangContext } from '../providers/LangContextProvider';

type InputProps = {
  type: string,
  label: string,
  value?: string,
  error?: string,
  help?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};
type HelpProps = {
  message: string,
}

const Input:React.FC<InputProps> = ({ type, label, value, error, help, onChange }) => {
  const { getText } = useContext(LangContext);
  
  return <div className='input-group'>
    <input
      type={type}
      placeholder=' '
      value={value ? value : ''}
      onChange={onChange}
    />
    <label>{getText(label)}</label>
    { error && <span className='error'>{getText(error)}</span> }
    
    { help && <Help message={getText(help)} /> }
  </div>
}

const Help: React.FC<HelpProps> = ({ message }) => {
  
  return <div className="help">
    <span>{message}</span>
  </div>
}

export default Input;