import React, { useContext } from 'react'
import { LangContext } from '../providers/LangContextProvider'

type PrimaryBtnProps = {
  text: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  disabled: boolean
  disabeldLabel?: string
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  icon,
  iconPosition = 'left',
  onClick,
  disabled,
  disabeldLabel
}) => {
  const { getText } = useContext(LangContext)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`primary-btn${disabled ? ' disabled' : ''}${
        iconPosition === 'right' ? ' icon-right' : ' icon-left'
      }`}
    >
      {icon && iconPosition === 'left' && icon}
      <p>{disabled ? (disabeldLabel ? getText(disabeldLabel) : getText(text)) : getText(text)}</p>
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
export default PrimaryBtn
