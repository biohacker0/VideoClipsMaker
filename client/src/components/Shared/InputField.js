import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const InputField = ({
  background,
  clipName,
  handleChange,
  disabled,
  color,
  label,
  height,
}) => {
  const useStyles = makeStyles({
    root: {
      height: height,
    },
  })
  const classes = useStyles()
  return (
    <TextField
      style={{
        background: background,
        height: height,
        padding: '0',
      }}
      className={classes.root}
      id='outlined-basic'
      label={label}
      variant='outlined'
      disabled={disabled}
      value={clipName}
      onChange={(e) => handleChange(e)}
      InputLabelProps={{
        style: { color: color },
      }}
      InputProps={{
        classes: {
          root: classes.root,
        },
      }}
    />
  )
}

export default InputField
