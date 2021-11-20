import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const ToogleBtn = ({ onClick, hidebtn, text, height, width, algnText }) => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <Button
      onClick={(e) => onClick(e)}
      style={{
        border: '1px solid #48B499',
        color: '#48B499',
        textTransform: 'none',
        height: '50px',
        textAlign: 'left',
        width: width,
      }}
      variant='outlined'
      color='primary'
      endIcon={
        <FormControlLabel
          style={{ marginLeft: '2%', display: hidebtn }}
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange}
              name='checkedB'
              color='secondary'
              onClick={() => onClick()}
            />
          }
        />
      }
    >
      <Typography align='left'>{text}</Typography>
    </Button>
  )
}

export default ToogleBtn
