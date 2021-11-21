import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './MakeClipStyles'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Drawer from '@material-ui/core/Drawer'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

import Selector from '../../components/Selector/Selector'
import Card from '@material-ui/core/Card'
import InputField from '../../components/Shared/InputField'
import ToogleBtn from '../../components/Shared/ToogleBtn'
import Scale from '../../components/Scales/Scale'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

import { setMetadata } from '../../redux/reducers/videoSlice'
import {
  setInitialState,
  setCurrentClipId,
  addClip,
} from '../../redux/reducers/clipSlice'

import Zoom from '../../components/Scales/Zoom'
import { useSelector } from 'react-redux'
import Video from '../../components/Shared/Video'
import axios from 'axios'

import {
  handleSave,
  onLoad,
  handleSaveClip,
  handleScaleChange,
} from '../../redux/utils/MakeClipsFunctions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@material-ui/core/CircularProgress'

const MakeClip = ({ videoDownloaded, setVideoDownloaded, setIsLoading }) => {
  const history = useHistory()

  const classes = useStyles()
  const videoRef = React.createRef()
  const { uuid } = useParams()

  const dispatch = useDispatch()
  ////useStateSection//////
  const [hidden, setHidden] = useState(true)
  let [secondsArray] = useState([
    '0.25 seconds',
    '0.5 seconds',
    '1 seconds',
    '2 seconds',
    '3 seconds',
    '4 seconds',
    '5 seconds',
  ])
  const [secondIndex, setSecondIndex] = useState(3)
  const [scale, setScale] = useState(2)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(4)
  const [currentZoom, setCurrentZoom] = useState(0)
  const [clipName, setclipName] = useState('')

  const [addingClip, setAddingClip] = useState(false)
  // const [videoDownloaded, setVideoDownloaded] = useState({
  //   uuid: '',
  //   name: '',
  //   createdAt: '',
  //   filepath: '',
  //   clips: [],
  // })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const [value, setValue] = useState(['0', '100'])
  const [startingTime, setStartingTime] = useState(0)
  const [endingTime, setEndingTime] = useState(0)
  const [currentClip, setCurrentClip] = useState('Orignal Video')
  ///useStateSection End////
  //useSelectorSection////
  const clips = useSelector((state) => state.clips.clips)
  const currentClipId = useSelector((state) => state.clips.currentClipId)
  const state = useSelector((state) => state.clips)
  //useSelectorSection End///
  //useEffectSection///

  //useEffectSection End////

  const handleChange = (e) => setclipName(e.target.value)
  const onClick = () => setHidden(!hidden)

  const getVideo = async (uuid) => {
    try {
      const res = await axios.get(`/download/${uuid}`)
      console.log(res)
      setVideoDownloaded(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddClip = async (uuid) => {
    try {
      setIsLoading(true)
      const body = JSON.stringify({
        clipname: clipName,
        startingTime: value[0],
        duration: value[1],
      })
      const res = await axios.post(`/make-clip/${uuid}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setVideoDownloaded(res.data)
      if (res.data) {
        toast.success('Clip Added, Check Hamburger option on Top Left')
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }
  // const handleDownloadClip = async (uuid, clipid) => {
  //   try {
  //     await axios.get(`/download-clip/${uuid}/${clipid}`)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const deleteClip = async (uuid, clipid) => {
  //   try {
  //     const res = await axios.delete(`/delete-clip/${uuid}/${clipid}`)
  //     setVideoDownloaded(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    getVideo(uuid)
  }, [])
  // useEffect(() => {
  //   videoRef.current.seekTo(value[0])
  // }, [value])

  // useEffect(() => handleSave(state), [state])

  console.log(videoDownloaded)

  if (!videoDownloaded.uuid) return <CircularProgress />
  return (
    <div className={classes.root}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Video
            setMetadata={setMetadata}
            setEndingTime={setEndingTime}
            setValue={setValue}
            setInitialState={setInitialState}
            setCurrentClipId={setCurrentClipId}
            addClip={addClip}
            dispatch={dispatch}
            history={history}
            currentClipId={currentClipId}
            clips={clips}
            videoFunction={onLoad}
            videoRef={videoRef}
            videoDownloaded={videoDownloaded}
            isVideoLoaded={isVideoLoaded}
            setIsVideoLoaded={setIsVideoLoaded}
          />

          {/* tanul  code */}
          <Card className={classes.scaleCard}>
            <div className={classes.scaleimgDiv}>
              <Scale
                videoRef={videoRef}
                startingTime={startingTime}
                setStartingTime={setStartingTime}
                endingTime={endingTime}
                setEndingTime={setEndingTime}
                value={value}
                setValue={setValue}
                currentClip={currentClip}
                setCurrentClip={setCurrentClip}
                setCurrentZoom={setCurrentZoom}
              />
            </div>
            {hidden && (
              <div className={classes.scaleimgDiv}>
                <Zoom
                  videoRef={videoRef}
                  startingTime={startingTime}
                  endingTime={endingTime}
                  value={value}
                  setValue={setValue}
                  secondIndex={secondIndex}
                  setSecondIndex={setSecondIndex}
                  scale={scale}
                  min={min}
                  max={max}
                  setMin={setMin}
                  setMax={setMax}
                  currentZoom={currentZoom}
                />
              </div>
            )}

            <div className={classes.toogleDiv}>
              <InputField
                background='#EEFBF8'
                clipName={clipName}
                handleChange={handleChange}
                color='#48B499'
                label='Enter Clip Name'
                height='50px'
              />
              <div style={{ marginTop: '2em ', marginBottom: '2em' }}>
                {hidden && (
                  <div className={classes.toggleButtons}>
                    <Button className={classes.scaleBTN} variant='outlined'>
                      Scale
                    </Button>

                    <Selector
                      options={secondsArray}
                      border={'1px solid #7984A1'}
                      playerName={secondsArray[secondIndex]}
                      width='100%'
                      fullWidth='fullWidth'
                      handleChange={(e) =>
                        handleScaleChange(
                          e,
                          setScale,
                          setSecondIndex,
                          setMin,
                          setMax,
                          value,
                          currentZoom,
                          startingTime,
                          endingTime
                        )
                      }
                      color='#FCFCFC'
                      height='50px'
                    />
                  </div>
                )}
              </div>

              <ToogleBtn onClick={onClick} text='Mark Accurately' />
            </div>
          </Card>
          <div className={classes.addClipBtnContainer}>
            <Button
              className={classes.addClipBtn}
              variant='contained'
              onClick={(e) => handleAddClip(uuid)}
            >
              Add Clip
            </Button>
            <Button
              onClick={() => history.push('/')}
              className={classes.addClipBtn}
              variant='contained'
            >
              Home Page
            </Button>
          </div>
        </Grid>
        {/* <Grid item xs={12} md={3} lg={3}>
          <Drawer
            style={{ background: 'red' }}
            anchor='bottom'
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div
              style={{ background: '#FFFAFA		' }}
              className={classes.drawerContainer}
            >
              <List>
                {videoDownloaded.clips &&
                  videoDownloaded.clips.map((obj, index) => (
                    <ListItem button key={index}>
                      <ListItemIcon>
                        <IconButton
                          color='secondary'
                          aria-label='delete'
                          onClick={() => deleteClip(uuid, obj.uuid)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          color: 'black',
                        }}
                        primary={obj.name.substring(0, 10)}
                      />
                      <Button
                        variant='contained'
                        size='small'
                        style={{
                          background: '#115294',
                          color: 'white',
                          textDecoration: 'none',
                        }}
                        onClick={() => handleDownloadClip(uuid, obj.uuid)}
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </ListItem>
                  ))}
              </List>
            </div>
          </Drawer>
        </Grid> */}
      </Grid>
    </div>
  )
}

export default MakeClip
