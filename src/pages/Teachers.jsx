import * as React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import teacherService from '../services/teachers.service';
import TableNoRows from '../components/TableNoRows';
import DataTable from '../components/DataTable';
import { Button } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";


const columns = [
  { field: "name", headerName: "First name", width: 180 },
  { field: "lastName", headerName: "Last name", width: 180 },
  { field: "profile", headerName: "Profile", width: 100},
  { field: "specialty", headerName: "Specialty", width: 160},
  { field: "hours", headerName: "Hours", width: 80 },
  { field: "subjects", headerName: "Subjects", width: 260},
  { field: "status", headerName: "Status", width: 120},
  { field: 'add',
        renderCell: (cellValues) => {
            return(
                <Button
                  className='buttonTable'
                  variant="contained"
                  color="primary"
                  startIcon={<LibraryAddIcon />}
                >
                    Add
                </Button>
            )
        },
        headerName: ' ', 
        width: 120
    },
    { field: 'update',
        renderCell: (cellValues) => {
            return(
                <Button
                  className='buttonTable'
                  variant="contained"
                  color="secondary"
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
                  className='buttonTable'
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
      <div style={{ width: "100%", margin:20 }}>

        <h1>Teachers</h1>
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