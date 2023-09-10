import { useEffect, useState } from "react"
import subjectService from "../services/subjects.service"
import TableNoRows from "../components/TableNoRows"
import DataTable from "../components/DataTable"
import { Button } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'grade', headerName: 'Grade', width: 90 },
    { field: 'credits', headerName: 'credits', width: 120 },
    { field: 'hoursWeek', headerName: 'Hours Week', width: 90 },
    { field: 'maxHoursDay', headerName: 'Hours Day', width: 90 },
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

const Subjects = () => {

    const [ dataGroup, setDataGroup ] = useState([])

    const getAllSubject = async () => {
        try {
          const response = await subjectService.getAllSubjects()
          setDataGroup(response.data)
        } catch (error) {
          console.log(error)
        }
    
    }

    useEffect(() => {
        getAllSubject();
    }, [])
    return(
        <div>
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
    )
}

export default Subjects;