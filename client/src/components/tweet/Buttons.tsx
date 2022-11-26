import React from 'react'
import TwitterComment from '../../assets/twitterIcons/TwitterComment'
import TwitterLike from '../../assets/twitterIcons/TwitterLike'
import TwitterRetweet from '../../assets/twitterIcons/TwitterRetweet'
import TwitterShare from '../../assets/twitterIcons/TwitterShare'

const Buttons: React.FC = () => {
  return (
    <div className="buttons">
      <TwitterComment />
      <TwitterRetweet />
      <TwitterLike />
      <TwitterShare />
    </div>
  )
}
export default Buttons
