import React, { useContext, useState } from 'react'
import { ThemeContext } from './providers/ThemeContextProvider'

type ImgProps = {
  src: string
  alt: string
  className?: string
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const { setThemeClassName } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`img-container${className ? ` ${className}` : ''}`}>
      {isLoading && <span className={`${setThemeClassName('img-loading')}`}></span>}
      <img src={src} alt={alt} className={className} onLoad={() => setIsLoading(false)} />
    </div>
  )
}
export default Img
