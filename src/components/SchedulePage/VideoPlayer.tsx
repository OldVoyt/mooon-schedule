import ReactPlayer from 'react-player'
import React from 'react'
import './SchedulePage.css'

export interface IVideoPlayerProps {
  videoLink: string
}
export const VideoPlayer = ({ videoLink }: IVideoPlayerProps) => {
  const handleClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div className="player-container">
      <ReactPlayer
        className="react-player"
        url={videoLink}
        config={{
          youtube: {
            playerVars: { autoplay: 1, showInfo: 0, controls: 0, disablekb: 1, modestbranding: 1, iv_load_policy: 3 }
          }
        }}
        width="100%"
        height="100%"
        playing={true}
        loop={true}
        muted={true}
      />
      <div className="unclickable-area" onClick={handleClick} />
    </div>
  )
}

const opts = {
  height: '100%',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    modestbranding: 1,
    iv_load_policy: 3,
    autoplay: 1,
    loop: 1
  }
}

const style = {
  width: '100%',
  height: '100%'
}
