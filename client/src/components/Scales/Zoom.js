import React, { useState, useEffect } from 'react'
import { Grid, Slider, Tooltip } from '@material-ui/core'

import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import './Zoom.css'

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
  },
}))
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const PrettoSlider = withStyles({
  root: {
    color: '#F4F7FF',
    height: '18px',

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    margin: '2em 0',
  },

  thumb: {
    borderRadius: '0px',
    height: '60px',
    width: 5,
    backgroundColor: '#324371',
    boxShadow: iOSBoxShadow,
    marginTop: -20,
    marginBottom: '2em',
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    // top: -22,
    '& *': {
      background: 'transparent',
      color: 'black',
    },
  },
  track: {
    background: '#F4F7FF',
    opacity: 0.5,
    height: '43px',
    marginTop: -13,
  },
  rail: {
    height: '20px',
    opacity: 1,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    color: 'red',
    height: '30px',
    width: 1,
    marginTop: '40px',
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'black',
    color: 'red',
    height: '30px',
  },
})((props) => {
  console.log(props)
  const {
    max,
    min,
    id,
    onChange,
    step,
    value,
    valueLabelDisplay,
    valueLabelFormat,
    getAriaValueText,
    scale,
    ValueLabelComponent,
  } = props
  return (
    <Slider
      style={{ backgroundImage: `url(./scale/Scale${scale}.png)`, zIndex: '5' }}
      classes={props.classes}
      max={max}
      min={min}
      id={id}
      onChange={onChange}
      step={step}
      value={value}
      valueLabelDisplay={valueLabelDisplay}
      getAriaValueText={getAriaValueText}
      valueLabelFormat={valueLabelFormat}
      ValueLabelComponent={ValueLabelComponent}
      aria-label='pretto slider'
    />
  )
})

function valueLabelFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600)
  var mins = ~~((duration % 3600) / 60)
  var secs = ~~duration % 60
  var microseconds = Math.floor((duration % 1).toFixed(2) * 1000)
  // Output like "1:01" or "4:03:59" or "123:03:59"
  var time = ''

  if (hrs > 0) {
    time += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  time += '' + mins + ':' + (secs < 10 ? '0' : '')
  time += '' + secs
  if (microseconds < 100) time += ':0' + String(microseconds).slice(0, 1)
  else time += ':' + String(microseconds).slice(0, 2)
  return time
}

function ValueLabelComponent(props) {
  const { children, open, value } = props
  const classes = useStylesBootstrap()
  return (
    <Tooltip
      arrow
      classes={classes}
      open={open}
      enterTouchDelay={0}
      placement='top'
      title={value}
    >
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

function Zoom(props) {
  const { min, max, scale, setMin, setMax, currentZoom, secondIndex } = props

  const endingTime = props.endingTime

  const [value, setValue] = useState(0)

  useEffect(() => {
    getValue()
  }, [secondIndex])

  const handleChange = (event, newValue) => {
    if (newValue >= max) {
      setMin(props.value[currentZoom])
      let v = props.value
      v[currentZoom] = max
      props.setValue(v)
      if (max + scale <= props.endingTime)
        setMax((prevstate) => prevstate + scale)
      else setMax(props.endingTime)
    } else if (newValue <= min) {
      setMax(props.value[currentZoom])
      let v = props.value
      v[currentZoom] = min
      props.setValue(v)
      if (min - scale >= props.startingTime)
        setMin((prevstate) => prevstate - scale)
      else setMin(props.startingTime)
    }
    let v_ref = props.videoRef.current
    if (v_ref) {
      const val = props.value
      val[currentZoom] = newValue
      props.setValue(val)
      setValue(newValue)
      v_ref.seekTo(newValue)
    }
  }

  const getValue = () => {
    if (props.value[currentZoom] > max || props.value[currentZoom] < min) {
      setMin(Math.max(props.value[currentZoom] - scale, props.startingTime))
      setMax(Math.min(props.value[currentZoom] + scale, props.endingTime))
      console.log(max)
      console.log(min)
    }
    if (min === max) {
      if (min === props.startingTime) {
        if (max + scale <= props.endingTime)
          setMax((prevstate) => prevstate + scale)
        else setMax(props.endingTime)
      } else {
        if (min - scale <= props.endingTime)
          setMin((prevstate) => prevstate - scale)
        else setMin(props.startingTime)
      }
    }
    return props.value[currentZoom]
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <div className='VideoProgressBar'>
            <PrettoSlider
              id='pretto-slider'
              valueLabelDisplay='auto'
              aria-label='pretto slider'
              value={getValue()}
              onChange={handleChange}
              min={props.min}
              max={props.max}
              step={0.01}
              scale={props.scale}
              ValueLabelComponent={ValueLabelComponent}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems='center' alignContent='center'></Grid>
    </div>
  )
}

export default Zoom
