import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import groupService from "../services/group.service";
import TableNoRows from "../components/TableNoRows";

const columns = [
    { field: 'name', headerName: 'Description', width: 230 },
    { field: 'students', headerName: 'Students', width: 230 },
    { field: 'subjects', headerName: 'Subjects', width: 230 },
    { field: 'tutor', headerName: 'Tutor', width: 230 }
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