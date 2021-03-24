import React from "react";
import { TextField } from "@material-ui/core";

const Input = ({ handleChange, value = "", label = "", isTouched }) => {
  return (
    <TextField
      label={label}
      value={isTouched ? value : ""}
      placeholder={value.toString()}
      onChange={handleChange}
      variant="filled"
      type="number"
      style={{ flex: "1 1 auto", margin: 5 }}
      InputProps={{ inputProps: { min: 0, max: 100 } }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default Input;
