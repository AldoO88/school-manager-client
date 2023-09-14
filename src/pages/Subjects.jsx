import { useEffect, useState } from "react"
import subjectService from "../services/subjects.service"
import TableNoRows from "../components/TableNoRows"
import DataTable from "../components/DataTable"
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AddIcon from "@mui/icons-material/Add";
import { amber, deepPurple, grey, indigo, red } from "@mui/material/colors";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


const initAddStudentpForm = {
    name: "",
    description: "",
    gender: "",
    credits:"",
    hoursWeek: "",
    maxHoursDay: "",
  };

const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 220 },
    { field: 'grade', headerName: 'Grade', width: 90 },
    { field: 'credits', headerName: 'credits', width: 120 },
    { field: 'hoursWeek', headerName: 'Hours Week', width: 90 },
    { field: 'maxHoursDay', headerName: 'Max Hours Day', width: 90 },
    { field: 'update',
        renderCell: (cellValues) => {
            return(
                <Button
                    className='buttonTable'
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

const Subjects = () => {

    const [ dataGroup, setDataGroup ] = useState([])
    const [open, setOpen] = useState(false);
    const [ addSubjectForm, setAddSubjectForm ] = useState(initAddStudentpForm)
    const [errorMessage, setErrorMessage] = useState(undefined);
    //const [message, setMessage ] = useState(undefined);
    //const [ idSubject, setIdSubject ] = useState(null)

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           
                await subjectService.createSubjects(addSubjectForm);
                setAddSubjectForm(initAddStudentpForm);
                getAllSubject();
                //setMessage(response.data.message)
                
            
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setAddSubjectForm(initAddStudentpForm);

  };

  const handleAddSubjectForm = (nameField, value) => {
    setAddSubjectForm((prevState) => ({ ...prevState, [nameField]: value }));

  }
    return(
        <div style={{ width: "100%", margin:20}}>
        <h1>Subjects</h1>
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start">
          <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Box>
        
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

        <Dialog open={open} maxWidth="sm">
          <DialogTitle
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: indigo[900] }}>
              <HistoryEduIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Subject
            </Typography>
          </DialogTitle>
          <Divider />
          <Box onSubmit={handleSubmit} component="form" noValidate>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={addSubjectForm.name}
                    onChange={(e) =>
                    handleAddSubjectForm("name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="family-name"
                    value={addSubjectForm.description}
                    onChange={(e) =>
                        handleAddSubjectForm("description", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="grade">Grade</InputLabel>
                    <Select
                      required
                      labelId="grade"
                      id="grade"
                      value={addSubjectForm.grade}
                      label="Grade"
                      name="grade"
                      onChange={(e) =>
                        handleAddSubjectForm("grade", e.target.value)
                      }
                      style={{ textAlign: "left" }}>
                      <MenuItem value={"1RO"}>1RO</MenuItem>
                      <MenuItem value={"2DO"}>2DO</MenuItem>
                      <MenuItem value={"3RO"}>3RO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="credits"
                    label="Credits"
                    name="credits"
                    autoComplete="credits"
                    value={addSubjectForm.credits}
                    onChange={(e) =>
                        handleAddSubjectForm("credits", e.target.value)
                      }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="hoursWeek"
                    label="Hours Week"
                    name="hoursWeek"
                    autoComplete="hoursWeek"
                    value={addSubjectForm.hoursWeek}
                    onChange={(e) =>
                        handleAddSubjectForm("hoursWeek", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="maxHoursDay"
                    label="Max Hours Day"
                    name="maxHoursDay"
                    autoComplete="maxHoursDay"
                    value={addSubjectForm.maxHoursDay}
                    onChange={(e) =>
                        handleAddSubjectForm("maxHoursDay", e.target.value)
                    }
                  />
                </Grid>

                
              </Grid>
            </DialogContent>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            
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
                onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: "white",
                }}>
                {

                }
                Submit
              </Button>
            </DialogActions>
          </Box>
        </Dialog>


        </div>
    )
}

export default Subjects;