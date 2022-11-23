import React, { useContext } from 'react';
import { LangContext } from '../providers/LangContextProvider';

type PrimaryBtnProps = {
  text: string,
  icon?: React.ReactNode,
  iconPosition?: 'left' | 'right',
  onClick?: () => void,
  disabled: boolean,
  disabledLabel?: string,
};

const PrimaryBtn:React.FC<PrimaryBtnProps> = ({ text, icon, iconPosition='left', onClick, disabled, disabledLabel }) => {
  const { getText } = useContext(LangContext)
  
  return <button
    onClick={onClick}
    disabled={disabled}
    className={`primary-btn${disabled ? ' disabled' : ''}${iconPosition === 'right' ? ' icon-right' : ' icon-left'}`}
  >
    {(icon && iconPosition === 'left' && !disabled) && icon}
    <p>{ disabled ? disabledLabel ? getText(disabledLabel) : getText(text) : getText(text) }</p>
    {(icon && iconPosition === 'right' && !disabled) && icon}
  </button>
}
export default PrimaryBtn;