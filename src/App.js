import "./App.css";
import React from "react";
import { Container } from "@material-ui/core";
import ResultsTable from "./components/ResultsTable";
import Form from "./components/Form";

function App() {
  const [tableArray, setTableArray] = React.useState([]);

  const onSubmit = (winChance, lossChance, drawChance, result) => {
    console.log(winChance, lossChance, drawChance, result);
    setTableArray([
      { win: winChance, loss: lossChance, draw: drawChance, res: result },
      ...tableArray,
    ]);
  };

  return (
    <Container
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
      maxWidth="sm"
    >
      <ResultsTable arr={tableArray} />
      <Form onSubmit={onSubmit} />
    </Container>
  );
}

export default App;
