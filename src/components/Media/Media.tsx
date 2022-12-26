import React from 'react'

function Media() {
  const videolink = ''

  return (
    <div className="media_vertical">
      <video className="video" autoPlay muted loop src={videolink}></video>
    </div>
  )
}

export default Media
