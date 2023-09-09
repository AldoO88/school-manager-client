import * as React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import teacherService from '../services/teachers.service';
import TableNoRows from '../components/TableNoRows';
import DataTable from '../components/DataTable';


const columns = [
  { field: "name", headerName: "First name", width: 230 },
  { field: "lastName", headerName: "Last name", width: 230 },
  { field: "profile", headerName: "Profile", width: 190},
  { field: "subjects", headerName: "Subjects", width: 190}
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