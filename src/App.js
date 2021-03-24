import './App.css';
import React from 'react';
import {Container} from "@material-ui/core";
import {blueGrey} from "@material-ui/core/colors";
import ResultsTable from "./components/ResultsTable";
import Form from "./components/Form";

function App() {
  const arr = [{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'},{win: 30, lose: 60, draw: 10, res: 'win'}]

  return (
    <Container style={{backgroundColor: blueGrey.A100, height: '100%', display: 'flex', flexDirection: 'column'}}>
      <ResultsTable arr={arr}/>
      <Form onSubmit={null}/>
    </Container>
  );
}

export default App;
