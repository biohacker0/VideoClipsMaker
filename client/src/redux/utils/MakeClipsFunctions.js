export const handleSave = (state) => {
  let url = 'http://127.0.0.1:5000/saveState'

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  }

  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((res) => console.log(res))
}

export const onLoad = (
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
) => {
  console.log({
    isVideoLoaded,
    setIsVideoLoaded,
  })
  if (!isVideoLoaded) {
    setValue([0, e.getDuration()])
  }
  dispatch(
    setMetadata({
      videoHeight: e.props.height,
      videoWidth: e.props.width,
      duration: e.getDuration(),
    })
  )
  console.log('hello')

  const newClip = {
    name: videoDownloaded && videoDownloaded.name,
    startingTime: 1,
    endingTime: e.getDuration(),
    annotations: [],
  }
  dispatch(addClip(newClip))
  setEndingTime(e.getDuration())

  setIsVideoLoaded(true)
}

export const handleSaveClip = (
  clipName,
  setAddingClip,
  clips,
  value,
  addClip,
  setclipName,
  dispatch,
  history
) => {
  let name = clipName
  if (name.trim() === '') {
    alert('Clip Name cannot be empty!')
    setAddingClip(false)
    return
  }

  const check = clips.filter((clip) => clip.name === name)
  if (check.length !== 0) {
    alert('Clip Name already in use!')
    setAddingClip(false)
    return
  }

  const startingTime = value[0]
  const endingTime = value[1]
  const newClip = {
    name,
    startingTime,
    endingTime,
    annotations: [],
  }
  dispatch(addClip(newClip))

  setclipName('')
  history.push('/edit-clip')

  setAddingClip(false)
}

export const handleScaleChange = (
  e,
  setScale,
  setSecondIndex,
  setMin,
  setMax,
  value,
  currentZoom,
  startingTime,
  endingTime
) => {
  let newScale = parseFloat(e.target.value.split(' ')[0])
  setScale(newScale)
  setSecondIndex(
    parseFloat(e.target.value.split(' ')[0]) > 0.25
      ? parseInt(e.target.value.split(' ')[0], 10) + 1
      : 0
  )
  setMin(Math.max(value[currentZoom] - newScale, startingTime))
  setMax(Math.min(value[currentZoom] + newScale, endingTime))
}

export const handleRemoveClip = (
  dispatch,
  removeClip,
  currentClip,
  setCurrentClip,
  setValue,
  clips,
  setEndingTime,
  setStartingTime,
  setCurrentClipId
) => {
  dispatch(removeClip(currentClip))
  setCurrentClip('Orignal Video')
  setValue([clips[0].startingTime, clips[0].endingTime])
  setEndingTime(clips[0].endingTime)
  setStartingTime(clips[0].startingTime)
  dispatch(setCurrentClipId(0))
}
