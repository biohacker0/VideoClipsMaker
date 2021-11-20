import React from 'react'

import { InputLabel, FormControl, Select } from '@material-ui/core'
import { useStyles } from './SelectorStyles'

const Selector = ({
  title,
  width,
  options,
  playerName,
  handleChange,
  name,
  border,

  color,
  height,
  placeholder,
}) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.addPlayerForm}>
        <FormControl variant='outlined' style={{ width: width }}>
          <InputLabel id='demo-simple-select-filled-label'>
            {placeholder}
          </InputLabel>
          <div>
            <div
              className={classes.inputCustom}
              style={{ width: width, height: height }}
            >
              <InputLabel className={classes.dropdownLabel} margin='dense'>
                {title}
              </InputLabel>
              <Select
                id='demo-simple-select-filled'
                name={name}
                value={playerName}
                defaultValue={placeholder}
                style={{
                  width: width,
                  // marginTop: "-20px",
                  backgroundColor: color,
                  height: height,
                  border: border,
                }}
                onChange={handleChange}
              >
                <option aria-label='None' value='' />
                {options.map((option, index) => (
                  <option
                    key={index}
                    style={{ cursor: 'pointer' }}
                    value={option === playerName ? playerName : option}
                  >
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </FormControl>
      </div>
    </div>
  )
}
Selector.defaultProps = {
  options: [],
}

export default Selector
