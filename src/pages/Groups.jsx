import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import groupService from "../services/group.service";
import TableNoRows from "../components/TableNoRows";
import { Button } from "@mui/material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { GridDeleteIcon } from "@mui/x-data-grid";

const columns = [
    { field: 'name', headerName: 'Description', width: 230 },
    { field: 'students', headerName: 'Students', width: 230 },
    { field: 'subjects', headerName: 'Subjects', width: 230 },
    { field: 'tutor', headerName: 'Tutor', width: 230 },
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

const Groups = () => {

    const [ dataGroup, setDataGroup ] = useState([])

    const getAllGroup = async () => {
        try {
          const response = await groupService.getAllGroups()
          setDataGroup(response.data)
        } catch (error) {
          console.log(error)
        }
    
    }

    useEffect(() => {
        getAllGroup();
    }, [])

    console.log(dataGroup)
    
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

export default Groups;