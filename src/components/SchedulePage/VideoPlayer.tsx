import ReactPlayer from "react-player";
import React, {useEffect, useRef} from "react";
import YouTubePlayer from 'youtube-player';
import './SchedulePage.css'


export interface IVideoPlayerProps {
    videoLink: string
}
export const VideoPlayer = ({videoLink}:IVideoPlayerProps) => {
    const handleClick = (e: any) => {
        e.stopPropagation();
    };

    return <div className="player-container">
        <ReactPlayer
            className="react-player"
            url={videoLink}
            config={{
                youtube: {
                    playerVars: {autoplay: 1, showInfo: 0, controls: 0, disablekb: 1, modestbranding: 1, iv_load_policy: 3}
                }
            }}
            width="100%"
            height="100%"
            playing={true}
            loop={true}
            muted={true}
        />
        <div className="unclickable-area" onClick={handleClick}/>
    </div>
}

const opts = {
    height: '100%',
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        showinfo: 0, controls: 0, disablekb: 1, modestbranding: 1, iv_load_policy: 3,
        autoplay: 1, loop: 1
    }
};

const style = {
    width: '100%',
    height: '100%'
}
export const VideoPlayer1 = ({videoLink}:IVideoPlayerProps) => {
    const playerRef = useRef<any>(null);


    useEffect(() => {
        const player = YouTubePlayer(playerRef.current);
        player.cueVideoById('2g811Eo7K8U', 0, 'large');
        player.setPlaybackRate(1);
        player.setVolume(0);
        player.playVideo();
        player.setLoop(true);
        player.setShuffle(false);
        player.setOption('PLAYER', 'controls', 0);
        player.setOption('PLAYER', 'showinfo', 0);
        player.setOption('PLAYER', 'modestbranding', 1);
        player.setOption('PLAYER', 'rel', 0);
        player.setOption('PLAYER', 'iv_load_policy', 3);
        return () => {
            player.destroy();
        }
    }, []);

    return <div ref={playerRef} style={{ width: '100%', height: '100%' }}/>
}