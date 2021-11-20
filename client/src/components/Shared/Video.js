import React from 'react'
import ReactPlayer from 'react-player'
import * as path from 'path'
const Video = ({
  setMetadata,
  setEndingTime,
  setStartingTime,
  setValue,
  setInitialState,
  setCurrentClipId,
  addClip,
  dispatch,
  history,
  currentClipId,
  clips,
  videoFunction,
  videoRef,
  videoDownloaded,
  isVideoLoaded,
  setIsVideoLoaded,
}) => {
  console.log(videoDownloaded)
  console.log(path.extname(videoDownloaded.name).substring(1))

  return (
    <div>
      {/* <video
        controls
        width='100%'
        height='auto'
        ref={videoRef}
        onLoadedMetadata={(e) =>
          videoFunction(
            e,
            setMetadata,
            setEndingTime,
            setValue,
            setInitialState,
            setCurrentClipId,
            addClip,
            dispatch,
            history,
            currentClipId,
            clips,
            setStartingTime
          )
        }
        id='video'
      >
        <source type='video/mp4' id='source' />
      </video> */}{' '}
      <ReactPlayer
        controls={true}
        ref={videoRef}
        height='600px'
        width='100%'
        url={videoDownloaded.filepath}
        onReady={(e) =>
          videoFunction(
            e,
            setMetadata,
            setEndingTime,
            setValue,
            setInitialState,
            setCurrentClipId,
            addClip,
            dispatch,
            history,
            currentClipId,
            clips,
            videoDownloaded,
            isVideoLoaded,
            setIsVideoLoaded
          )
        }
      />
    </div>
  )
}

export default Video
