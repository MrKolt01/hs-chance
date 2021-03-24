import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridDensitySelector,
} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
  root: { flex: "1 1 auto", display: "flex", flexDirection: "column" },
  TableWrapper: {
    margin: theme.spacing(1),
    flex: "1 1 auto",
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridDensitySelector />
    </GridToolbarContainer>
  );
}

const ResultsTable = ({ arr = [] }) => {
  const styles = useStyles();

  const prediction = (what) => {
    return Math.round(
      arr.reduce((prediction, current) => {
        return prediction + current[what] / 100;
      }, 0)
    );
  };

  const fact = (what) => {
    return arr.reduce((fact, current) => {
      if (current.res === what) {
        return fact + 1;
      }
      return fact;
    }, 0);
  };

  const eqPercent = (x, y) => {
    if (x === y) return 100;
    if (y === 0) return 0;
    return Math.round(100 - (Math.abs(x - y) / y) * 100);
  };

  const winP = prediction("win");
  const winF = fact("win");
  const winEq = eqPercent(winP, winF);

  const drawP = prediction("draw");
  const drawF = fact("draw");
  const drawEq = eqPercent(drawP, drawF);

  const lossP = prediction("loss");
  const lossF = fact("loss");
  const lossEq = eqPercent(lossP, lossF);

  const sumEq = Math.round((winEq + lossEq + drawEq) / 3);

  const Column = (r, g, b) => {
    return (params) => (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${params.value})`,
        }}
      >
        {params.value}
      </div>
    );
  };

  const historyColumns = [
    {
      field: "win",
      headerName: "W",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
      renderCell: Column(105, 240, 174),
    },
    {
      field: "draw",
      headerName: "D",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
      renderCell: Column(131, 195, 247),
    },
    {
      field: "loss",
      headerName: "L",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
      renderCell: Column(255, 102, 154),
    },
    {
      field: "res",
      headerName: "R",
      type: "number",
      flex: 1,
      sortable: false,
      cellClassName: "SuperCell",
      headerAlign: "center",
      renderCell: (params) => {
        let color = "rgb(131, 195, 247)";
        switch (params.value) {
          case "win":
            color = "rgb(105, 240, 174)";
            break;
          case "loss":
            color = "rgb(255, 102, 154)";
            break;
          default:
            break;
        }
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              backgroundColor: color,
            }}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  const historyRows = arr.map((el, idx) => ({
    id: idx,
    win: el.win + "%",
    draw: el.draw + "%",
    loss: el.loss + "%",
    res: el.res,
  }));

  const statisticColumns = [
    {
      field: "result",
      headerName: "R",
      type: "string",
      width: 70,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
    },
    {
      field: "prediction",
      headerName: "Расчет",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
    },
    {
      field: "fact",
      headerName: "Факт",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
    },
    {
      field: "eq",
      headerName: "Совпадение",
      type: "number",
      width: 120,
      sortable: false,
      headerAlign: "center",
      cellClassName: "SuperCell",
      renderCell: Column(105, 240, 174),
    },
  ];

  const statisticRows = [
    {
      id: "win",
      result: "W",
      prediction: winP,
      fact: winF,
      eq: winEq + "%",
    },
    {
      id: "draw",
      result: "D",
      prediction: drawP,
      fact: drawF,
      eq: drawEq + "%",
    },
    {
      id: "loss",
      result: "L",
      prediction: lossP,
      fact: lossF,
      eq: lossEq + "%",
    },
    { id: "sum", result: "Итог", eq: sumEq + "%" },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.TableWrapper}>
        <Typography variant="h5" gutterBottom>
          Статистика
        </Typography>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
          rows={statisticRows}
          columns={statisticColumns}
          density="standard"
          disableColumnMenu
          autoHeight
          hideFooter
          localeText={{
            toolbarDensity: "РАЗМЕР",
            toolbarDensityLabel: "Размер",
            toolbarDensityCompact: "Компактный",
            toolbarDensityStandard: "Стандартный",
            toolbarDensityComfortable: "Комфортный",
          }}
        />
      </div>
      <div className={styles.TableWrapper}>
        <Typography variant="h5" gutterBottom>
          История
        </Typography>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
          rows={historyRows}
          columns={historyColumns}
          density="compact"
          disableColumnMenu
          autoHeight
          hideFooter
          localeText={{
            toolbarDensity: "РАЗМЕР",
            toolbarDensityLabel: "Размер",
            toolbarDensityCompact: "Компактный",
            toolbarDensityStandard: "Стандартный",
            toolbarDensityComfortable: "Комфортный",
            noRowsLabel: "Пусто",
          }}
        />
      </div>
    </div>
  );
};

export default ResultsTable;
