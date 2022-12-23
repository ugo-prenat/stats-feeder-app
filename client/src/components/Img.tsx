import React from 'react'

type ImgProps = {
  src: string
  alt: string
  className?: string
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  return (
    <div className={`img-container${className ? ` ${className}` : ''}`}>
      <img src={src} alt={alt} className={className} />
    </div>
  )
}
export default Img
