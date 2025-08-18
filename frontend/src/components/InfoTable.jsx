
function InfoTable({ columns, data }) {
    // columns should be an array of objects with 'header' and 'accessor' properties
    // data should be an array of objects where each object represents a row
    console.log('Rendering InfoTable with columns:', columns);
    console.log('data:', data);
    console.log(data.length);
    

  return (
    <table style={{border: "3px solid black", borderRadius: "5px", overflow: "hidden"}}>
      <thead style={{backgroundColor: "lightgray", color: "black"}}>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((row, idx) => (
            <tr key={idx} style={{}}>
              {columns.map((col, cidx) => (
                <td key={cidx}>{row[col.accessor] || 'N/A'}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default InfoTable;