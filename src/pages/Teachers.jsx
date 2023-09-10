import * as React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import teacherService from '../services/teachers.service';
import TableNoRows from '../components/TableNoRows';
import DataTable from '../components/DataTable';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Button } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';


const columns = [
  { field: "name", headerName: "First name", width: 230 },
  { field: "lastName", headerName: "Last name", width: 230 },
  { field: "profile", headerName: "Profile", width: 190},
  { field: "subjects", headerName: "Subjects", width: 190},
  { field: 'update',
        renderCell: (cellValues) => {
            return(
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BrowserUpdatedIcon />}
                >
                    Update
                </Button>
            )
        },
        headerName: ' ', 
        width: 120
    },
    { field: 'delete',
        renderCell: (cellValues) => {
            return(
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<GridDeleteIcon />}
                >
                    Delete
                </Button>
            )
        },
        headerName: ' ', 
        width: 120
    }
];


const Teachers = () =>{
  const [ dataGroup, setDataGroup ] = useState([])

  const getAllTeacher = async () => {
    try {
      const response = await teacherService.getAllTeachers();
      setDataGroup(response.data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getAllTeacher()
  }, [])

    return (
      <div style={{ height: 400, width: "80%" }}>
      {
      dataGroup.length === 0 
            ?
                <TableNoRows 
                    columnsTable={columns}
                    />
            :
                <DataTable 
                    dataTable={dataGroup}
                    columnsTable={columns}
                />
            
        }
      
  </div>
      );
}

export default Teachers;