import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import groupService from "../services/group.service";
import TableNoRows from "../components/TableNoRows";
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { GridDeleteIcon } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { amber, deepPurple, grey, indigo, red } from "@mui/material/colors";
import Diversity3Icon from '@mui/icons-material/Diversity3';


const initAddGroupForm = {
    grade: "",
    group: "",
    name:"",
  };




const Groups = () => {

    const [ dataGroup, setDataGroup ] = useState([])
    const [open, setOpen] = useState(false);
    const [ addGroupForm, setAddGroupForm ] = useState(initAddGroupForm)
    const [ errorMessage, setErrorMessage ] = useState(undefined);
    //const [ message, setMessage ] = useState(undefined);
    const [ idGroup, setIdGroup ] = useState(null)
    const [ openDialog, setOpenDialog ] = useState(false)

    const columns = [
        { field: 'grade', headerName: 'Grade', width: 90 },
        { field: 'group', headerName: 'Group', width: 90 },
        { field: 'description', headerName: 'Description', width: 230 },
        { field: 'students', headerName: 'Students', width: 230 },
        { field: 'tutor', headerName: 'Tutor', width: 230 },
        { field: 'update',
            renderCell: (cellValues) => {
                return(
                    <Button
                    className='buttonTable'
                        variant="contained"
                        color="primary"
                        startIcon={<BrowserUpdatedIcon />}
                        onClick={() => getGroup(cellValues.id)}
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

    const handleClickOpen = () => {
        setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setAddGroupForm(initAddGroupForm);

  };

  const handleAddGroupForm = (nameField, value) => {
    setAddGroupForm((prevState) => ({ ...prevState, [nameField]: value }));

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
        if(!idGroup){
            await groupService.createGroup(addGroupForm);
            setAddGroupForm(initAddGroupForm);
            getAllGroup();
            setOpen(false);
            //setMessage(response.data.message)
        }else{
            await groupService.updateGroup(idGroup, addGroupForm);
            setAddGroupForm(initAddGroupForm);
            getAllGroup();
            setOpen(false);
        }
            
            
        
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
    
}

const getGroup = async (idGroup) => {
    try {
        setOpen(true)
        const response = await groupService.getOneGroup(idGroup)
        setAddGroupForm(response.data);
        setIdGroup(idGroup)
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
    
}

const openDialogClick = (studentId) => {
    setOpenDialog(true);
    setIdGroup(studentId);
}

const closeDialogClick = (studentId) => {
    setOpenDialog(false);
}

const deleteGroup = async () => {
    try {
      await groupService.deleteGroup(idGroup)
      getAllGroup();
      closeDialogClick();
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }
    
    return(
        <div style={{ width: "100%", margin:20 }}>
        <h1>Groups</h1>
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
              <Diversity3Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Group
            </Typography>
          </DialogTitle>
          <Divider />
          <Box onSubmit={handleSubmit} component="form" noValidate>
            <DialogContent>
              <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="grade">Grade</InputLabel>
                    <Select
                      required
                      labelId="grade"
                      id="grade"
                      value={addGroupForm.grade}
                      label="Grade"
                      name="grade"
                      onChange={(e) =>
                        handleAddGroupForm("grade", e.target.value)
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
                    autoComplete="given-name"
                    name="group"
                    required
                    fullWidth
                    id="group"
                    label="Group"
                    autoFocus
                    value={addGroupForm.group}
                    onChange={(e) =>
                        handleAddGroupForm("group", e.target.value)
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


        <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to eliminate the group?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <p>{`Se eliminara el grupo`}</p>
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
           onClick={deleteGroup} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Groups;