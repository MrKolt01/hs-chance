import React from "react";
import Input from "./Input";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    flex: "1 1 auto",
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  button: {
    flex: "1 1 auto",
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    bottom: 0,
    zIndex: 1000,
    background: "white",
    borderTop: "1px solid lightGrey",
  },
}));

const Form = ({ onSubmit }) => {
  const classes = useStyles();

  const [isWinTouched, setIsWinTouched] = React.useState(false);
  const [isLossTouched, setIsLossTouched] = React.useState(false);
  const [isResultTouched, setIsResultTouched] = React.useState(false);
  const [result, setResult] = React.useState("win");

  const handleChangeResult = (event) => {
    setResult(event.target.value);
    setIsResultTouched(true);
  };

  const [winChance, setWinChance] = React.useState(100);

  const [lossChance, setLossChance] = React.useState(0);

  const handleChangeChance = (
    yChance,
    setX,
    setY,
    xValue,
    isTouchedY,
    setTouchX,
    isResultTouched,
    setResult,
    type
  ) => {
    let newX = Math.min(xValue, 100);
    let newY = yChance;
    if (isTouchedY) {
      newX = Math.min(100 - yChance, newX);
    } else {
      newY = 100 - newX;
    }
    if (xValue === "") {
      setTouchX(false);
      newX = 100 - newY;
    } else {
      setTouchX(true);
    }
    setX(newX);
    setY(newY);

    if (!isResultTouched) {
      const draw = 100 - newX - newY;

      const max = Math.max(newX, newY, draw);
      if (max === draw) {
        setResult("draw");
      } else if (max === newX) {
        if (type === "win") {
          setResult("win");
        } else {
          setResult("loss");
        }
      } else {
        if (type === "win") {
          setResult("loss");
        } else {
          setResult("win");
        }
      }
    }
  };

  const handleChangeWin = (event) => {
    handleChangeChance(
      lossChance,
      setWinChance,
      setLossChance,
      event.target.value,
      isLossTouched,
      setIsWinTouched,
      isResultTouched,
      setResult,
      "win"
    );
  };

  const handleChangeLoss = (event) => {
    handleChangeChance(
      winChance,
      setLossChance,
      setWinChance,
      event.target.value,
      isWinTouched,
      setIsLossTouched,
      isResultTouched,
      setResult,
      "loss"
    );
  };

  const handleSubmit = () => {
    const drawChance = 100 - winChance - lossChance;
    onSubmit(winChance, lossChance, drawChance, result);
    setIsLossTouched(false);
    setIsWinTouched(false);
    setIsResultTouched(false);
  };

  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <Input
          handleChange={handleChangeWin}
          value={winChance}
          label={"Победа, %"}
          isTouched={isWinTouched}
        />
        <Input
          handleChange={handleChangeLoss}
          value={lossChance}
          label={"Поражение, %"}
          isTouched={isLossTouched}
        />
      </div>
      <FormControl component="fieldset" className={classes.radioGroup}>
        <FormLabel component="legend">Результат</FormLabel>
        <RadioGroup value={result} onChange={handleChangeResult}>
          <FormControlLabel
            value="win"
            control={<Radio />}
            label="Победа"
            color="primary"
          />
          <FormControlLabel
            value="draw"
            control={<Radio />}
            label="Ничья"
            color={"secondary"}
          />
          <FormControlLabel
            value="loss"
            control={<Radio />}
            label="Поражение"
            color={"default"}
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        className={classes.button}
        onClick={handleSubmit}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default Form;
