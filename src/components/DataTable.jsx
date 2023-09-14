
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';



const DataTable = (props) => {

    const { dataTable, columnsTable } = props;
  return (

    <div style={{ height: 400}}>
        <DataGrid
        key={dataTable._id}
        rows={dataTable}
        columns={columnsTable}
        getRowId={(dataTable) => dataTable._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
      
  );
}

export default DataTable;