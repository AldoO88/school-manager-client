import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import studentService from "../services/students.service";
import TableNoRows from "../components/TableNoRows";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import { amber, deepPurple, grey, indigo, red } from "@mui/material/colors";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'lastName', headerName: 'Last Name', width: 180 },
    { field: 'group.name', headerName: 'Group', width: 90 },
    { field: 'birthday', headerName: 'Birthday', width: 120 },
    { field: 'curp', headerName: 'CURP', width: 180 },
    { field: 'address', headerName: 'Address', width: 230 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'phone', headerName: 'Phone', width: 180 },
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

  const initAddStudentpForm = {
    name: '',
    lastName: '',
    profile: '',
    email: '',
    password: ''
}

const Students = () => {
    const [open, setOpen] = useState(false);
    const [ dataGroup, setDataGroup ] = useState([]);


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

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return(
        
        <div>
            <h1>Students</h1>
            <Box 
                sx={{ '& > :not(style)': { m: 1 }, }} 
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Fab color="secondary" aria-label="add" onClick={handleClickOpen} >
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

        <Dialog open={open} maxWidth="sm" >
        <DialogTitle 
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar sx={{ m: 1, bgcolor: indigo[900]}}>
                <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Student
            </Typography>
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    autoFocus
                    //value={signupForm.name}
                    //onChange={(e) => handleSignupForm('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    //value={signupForm.lastName}
                    //onChange={}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      required
                      labelId="gender"
                      id="gender"
                      //value={signupForm.profile}
                      label="Gender"
                      name="gender"
                      //onChange={(e) => handleSignupForm('profile', e.target.value)}
                      style={{ textAlign: "left" }}>
                      
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <DatePicker
  label="Controlled picker"
  //value={value}
  //onChange={(newValue) => setValue(newValue)}
/>
                  <TextField
                    required
                    fullWidth
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    autoComplete="birthday"
                    //value={signupForm.email}
                    //onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="curp"
                    label="CURP"
                    name="curp"
                    autoComplete="curp"
                    //value={signupForm.email}
                    //onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    //value={signupForm.email}
                    //onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    //value={signupForm.email}
                    //onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    //value={signupForm.email}
                    //onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>
                
                
              </Grid>
        </DialogContent>
        <DialogActions>
            <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: red[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white',
                }}
                onClick={handleClose}
            >Cancel</Button>
            <Button 
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white',
                }}
                onClick={handleClose}
            > 
          Subscribe</Button>
        </DialogActions>
      </Dialog>



        </div>
    )
}

export default Students;