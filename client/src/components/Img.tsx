import React, { useState } from 'react'

type ImgProps = {
  src: string
  alt: string
  className?: string
}

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`img-container${className ? ` ${className}` : ''}`}>
      {isLoading && <span className="img-loading"></span>}
      <img src={src} alt={alt} className={className} onLoad={() => setIsLoading(false)} />
    </div>
  )
}
export default Img
