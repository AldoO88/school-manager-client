import { useEffect, useState } from "react"
import subjectService from "../services/subjects.service"
import TableNoRows from "../components/TableNoRows"
import DataTable from "../components/DataTable"

const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'grade', headerName: 'Grade', width: 90 },
    { field: 'credits', headerName: 'credits', width: 120 },
    { field: 'hoursWeek', headerName: 'Hours Week', width: 90 },
    { field: 'maxHoursDay', headerName: 'Hours Day', width: 90 },

    
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