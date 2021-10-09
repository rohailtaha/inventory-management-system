import Header from './Header';
import Row from './row/Row';

function Table({ headers, rows }) {
  return (
    <table className='table table-sm'>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <Header header={header} key={index} />
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <Row row={row} key={index} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
