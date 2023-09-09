import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import studentService from "../services/students.service";
import TableNoRows from "../components/TableNoRows";

const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'lastName', headerName: 'Last Name', width: 180 },
    { field: 'group.name', headerName: 'Group', width: 90 },
    { field: 'birthday', headerName: 'Birthday', width: 120 },
    { field: 'curp', headerName: 'CURP', width: 180 },
    { field: 'address', headerName: 'Address', width: 230 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 180 },
    
  ];

const Students = () => {

    const [ dataGroup, setDataGroup ] = useState([])

    const getAllStudent = async () => {
        try {
          const response = await studentService.getAllStudents()
          setDataGroup(response.data)
        } catch (error) {
          console.log(error)
        }
    
    }

    useEffect(() => {
        getAllStudent();
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

export default Students;