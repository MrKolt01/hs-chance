import React from 'react'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {flex: '1 1 auto', overflow: 'auto'},
  table: {width: '100%'},
  tbody: {textAlign: 'center'},
  thead: {position: 'sticky', top: 0},

}));

const ResultsTable = ({arr = []}) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Победа</th>
            <th>Ничья</th>
            <th>Поражение</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
        {arr.map(({win, lose, draw, res},idx) =>
          <tr key={idx}>
            <td>{win}%</td>
            <td>{lose}%</td>
            <td>{draw}%</td>
            <td>{res}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable
