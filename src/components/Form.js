import React from 'react'
import Input from "./Input";
import {Button, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    flex: '1 1 auto',
    margin: theme.spacing(1),
    maxWidth: '100%',
  },
  button: {
    flex: '1 1 auto',
    margin: theme.spacing(1),
    maxWidth: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

const Form = ({onSubmit}) => {
  const classes = useStyles();

  const [isWinTouched, setIsWinTouched] = React.useState(false);
  const [isLoseTouched, setIsLoseTouched] = React.useState(false);

  const handleSubmit = ()=>{
    onSubmit();
    setIsLoseTouched(false)
    setIsWinTouched(false)
  }

  const [result, setResult] = React.useState('win');

  const handleChangeResult = (event) => {
    setResult(event.target.value);
  };

  const [winRate, setWinRate] = React.useState('');
  const handleChangeWinRate = (event) => {
    setIsWinTouched(true)
    if(event.target.value){
      if(!isLoseTouched){
        setWinRate(Math.min(event.target.value,100));
      } else {
        if(event.target.value > (100 - Number.parseInt(loseRate))){
          setWinRate(100 - Number.parseInt(loseRate))
        } else {
          setWinRate(event.target.value)
        }
      }
    } else {
      setWinRate('')
    }
    console.log(winRate,loseRate);
  }

  const [loseRate, setLoseRate] = React.useState('');
  const handleChangeLoseRate = (event) => {
    setIsLoseTouched(true)
    if(event.target.value){
      if(!isWinTouched){
        setLoseRate(Math.min(event.target.value,100));
      } else {
        if(event.target.value > (100 - Number.parseInt(loseRate))){
          setLoseRate(100 - Number.parseInt(winRate))
        } else {
          setLoseRate(event.target.value)
        }
      }
    } else {
      setLoseRate('')
    }
    console.log(winRate,loseRate);
  }

  return (
      <div className={classes.root}>
        <div style={{display: 'flex'}}>
          <Input handleChange={handleChangeWinRate} value={winRate} label={'Победа, %'}/>
          <Input handleChange={handleChangeLoseRate} value={loseRate} label={'Поражение, %'}/>
        </div>
        <FormControl component="fieldset" className={classes.radioGroup}>
          <FormLabel component="legend">Результат</FormLabel>
          <RadioGroup value={result} onChange={handleChangeResult}>
            <FormControlLabel value="win" control={<Radio/>} label="Победа" color="primary"/>
            <FormControlLabel value="lose" control={<Radio/>} label="Ничья" color={"secondary"}/>
            <FormControlLabel value="draw" control={<Radio/>} label="Поражение" color={"default"}/>
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
    )
}

export default Form
