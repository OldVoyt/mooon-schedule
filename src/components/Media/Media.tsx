import React from 'react'

function Media() {
  const videolink = 'https://drive.google.com/uc?id=1m6AmtJS8mVTgeigSLwVk-lYDXlysXl8t'

  return (
    <div className="media_vertical">
      <video className="video" autoPlay muted loop src={videolink}></video>
    </div>
  )
}

export default Media
