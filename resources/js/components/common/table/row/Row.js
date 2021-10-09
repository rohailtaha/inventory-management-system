import RowValue from './RowValue';

function Row({ rowValues }) {
  return (
    <tr>
      {rowValues.map((rowValue, index) => (
        <RowValue value={rowValue} key={index} />
      ))}
    </tr>
  );
}

export default Row;
