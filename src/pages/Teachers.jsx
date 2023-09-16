
import { useState } from 'react';
import { useEffect } from 'react';
import teacherService from '../services/teachers.service';
import TableNoRows from '../components/TableNoRows';
import DataTable from '../components/DataTable';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SubjectList from '../components/SubjectList';
import { amber, deepPurple, grey, red } from '@mui/material/colors';





const Teachers = () =>{
  const [ dataGroup, setDataGroup ] = useState([])
  const [ open, setOpen ] = useState(false);
  const [ idTeacher, setIdTeacher] = useState(null);
  const [ subjectChecked, setSubjectChecked] = useState([])
  const [ subjectCheckedLeft, setSubjectCheckedLeft] = useState([])
  const [ errorMessage, setErrorMessage] = useState(undefined);
  const [ openDialog, setOpenDialog ] = useState(false)


  const columns = [
    { field: "name", headerName: "First name", width: 180 },
    { field: "lastName", headerName: "Last name", width: 180 },
    { field: "profile", headerName: "Profile", width: 100},
    { field: "specialty", headerName: "Specialty", width: 160},
    { field: "hours", headerName: "Hours", width: 80 },
    { field: "subjects.name", headerName: "Subjects", width: 260},
    { field: "email", headerName: "Email", width: 260},
    { field: "status", headerName: "Status", width: 120},
    { field: 'add',
          renderCell: (cellValues) => {
              return(
                  <Button
                    className='buttonTable'
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(cellValues.id)}
                    startIcon={<LibraryAddIcon />}
                  >
                      Add
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
                    onClick={() => openDialogClick(cellValues.id)}
                  >
                      Delete
                  </Button>
              )
          },
          headerName: ' ', 
          width: 120
      }
  ];
  

  const handleClickOpen = (teacherId) => {
    //setOpen(true);
    setIdTeacher(teacherId);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllTeacher = async () => {

    try {
      const response = await teacherService.getAllTeachers();
      setDataGroup(response.data)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }

  }
  useEffect(() => {
    getAllTeacher()
  }, [])


  const addSubjectTeacher =  async () => {
    try {
      console.log(subjectChecked)
      await teacherService.addSubject(idTeacher, subjectChecked);

      deleteSubjectTeacher();
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  const deleteSubjectTeacher = async () => {
    try {
      await teacherService.deleteSubject(idTeacher, subjectCheckedLeft)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  const addAndDeleteSubjectTeacher = async () => {
   
    try {
      await Promise.race([addSubjectTeacher(), deleteSubjectTeacher()])
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }
  const openDialogClick = (idTeacher) => {
    setOpenDialog(true);
    setIdTeacher(idTeacher);
}

const closeDialogClick = (idTeacher) => {
  setOpenDialog(false);
  
} 



  const changeStatus = async () => {
    try {
      await teacherService.deleteTeacher(idTeacher)
      getAllTeacher();
      closeDialogClick();
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

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

        <Dialog open={open} onClose={handleClose} maxWidth='1200' onSubmit={addAndDeleteSubjectTeacher} component={"form"}>
        <DialogTitle>Add Subjects</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Select the subjects that the teacher will teach
          </DialogContentText>
          <SubjectList 
            setSubjectChecked={setSubjectChecked}
            setSubjectCheckedLeft={setSubjectCheckedLeft}
              idTeacher={idTeacher}
            />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to eliminate the teacher?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <p>{`Se eliminara el maestro` }</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: red[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: "white",
                }}
          onClick={closeDialogClick}>Cancel</Button>
          <Button
          variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: "white",
                }}
           onClick={ changeStatus} 
           >
            Agree
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogActions>
      </Dialog>
      
  </div>
      );
}

export default Teachers;