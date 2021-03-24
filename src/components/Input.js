import React from 'react'
import {TextField} from "@material-ui/core";

const Input = ({handleChange, value = '', label = ''}) => {
  return (
    <TextField
      label={label}
      value={value}
      placeholder={'0'}
      onChange={handleChange}
      variant="filled"
      type="number"
      style={{flex: '1 1 auto', margin: 5}}
      InputProps={{ inputProps: { min: 0, max: 10 } }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default Input
