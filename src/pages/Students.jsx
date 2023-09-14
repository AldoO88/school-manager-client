import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import studentService from "../services/students.service";
import TableNoRows from "../components/TableNoRows";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import { amber, deepPurple, grey, indigo, red } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const initAddStudentpForm = {
  name: "",
  lastName: "",
  gender: "",
  age:"",
  curp: "",
  address: "",
  email: "",
  phone: "",
};

const Students = () => {
  const [open, setOpen] = useState(false);
  const [ openDialog, setOpenDialog ] = useState(false)
  const [dataGroup, setDataGroup] = useState([]);
  const [addStudentForm, setAddStudentForm] = useState(initAddStudentpForm);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [date, setDate] = useState(dayjs(""));
  const [idStudentSelected, setIdStudentSelected] = useState(null);

  const columns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "lastName", headerName: "Last Name", width: 180 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "age", headerName: "Age", type: 'number', width: 60 },
    { field: "curp", headerName: "CURP", width: 190 },
    { field: "address", headerName: "Address", width: 230 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 100 },
    { field: "group.name", headerName: "Group", width: 90 },
    {
      field: "update",
      renderCell: (cellValues) => {
        return (
          <Button
          className='buttonTable'
            variant="contained"
            color="primary"
            startIcon={<BrowserUpdatedIcon />}
            onClick={() => getOneStudent(cellValues.id)}>
            Update
          </Button>
        );
      },
      headerName: " ",
      width: 120,
    },
    {
      field: "delete",
      renderCell: (cellValues) => {
        return (
          <Button
          className='buttonTable'
            variant="contained"
            color="error"
            startIcon={<GridDeleteIcon />}
            onClick={() => openDialogClick(cellValues.id)}>
            Delete
          </Button>
        );
      },
      headerName: " ",
      width: 120,
    },
  ];

  const getAllStudent = async () => {
    try {
      const response = await studentService.getAllStudents();
      setDataGroup(response.data);
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

 
  const deleteStudent = async () => {
    try {
      await studentService.deleteStudents(idStudentSelected);
      getAllStudent();
      handleClose();
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  };

  const getOneStudent = async (studentId) => {
    try {
        setOpen(true);
        const response = await studentService.getOneStudent(studentId)
        setAddStudentForm(response.data)
        const dateResponse = response.data;
        setDate(dayjs(dateResponse.birthday));
        const valueAge = calculatedAge(dateResponse.birthday)
        setAddStudentForm((prevState) => ({ ...prevState, age: valueAge }));
        setIdStudentSelected(studentId);
        
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  }

  const openDialogClick = (studentId) => {
        setOpenDialog(true);
        setIdStudentSelected(studentId);
  }

  const handleClickOpen = () => {
        setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
    setAddStudentForm(initAddStudentpForm);
    setDate(dayjs(''));
    setErrorMessage(undefined);
    setOpenDialog(false);
  };

  const handleAddStudentForm = (nameField, value) => {
    setAddStudentForm((prevState) => ({ ...prevState, [nameField]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const body = {
            name: addStudentForm.name,
            lastName: addStudentForm.lastName,
            gender: addStudentForm.gender,
            birthday: date,
            curp: addStudentForm.curp,
            address: addStudentForm.address,
            email: addStudentForm.email,
            phone: addStudentForm.phone,
          };
          console.log(addStudentForm.id)

        if(!idStudentSelected){
            const response = await studentService.createStudents(body);
            console.log("response: ", response.data);
            getAllStudent();
            handleClose();
        }else{
            const response = await studentService.updateStudents(idStudentSelected, body);
            console.log("response: ", response.data);
            getAllStudent();
            setOpen(false);
            handleClose();
        }
     
      
    } catch (error) {
      console.log("error: ", error);
      setErrorMessage(error.response.data.message);
    }
  };

  const selectDate = ( dateSelected, nameField ) => {
    setDate(dateSelected);
    const valueAge = calculatedAge(dateSelected)
    setAddStudentForm((prevState) => ({ ...prevState, [nameField]: valueAge }));
  }

  const calculatedAge = (date) => {
    const today = new Date();
    const birthday = new Date(date);
    let age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    console.log(age)
    return age;
}

  return (
   
        <div style={{ width: '100%',  margin:20}}>
        <h1>Students</h1>
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start">
          <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Box>
        {dataGroup.length === 0 ? (
          <TableNoRows columnsTable={columns} />
        ) : (
          <DataTable dataTable={dataGroup} columnsTable={columns} />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} maxWidth="sm">
          <DialogTitle
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: indigo[900] }}>
              <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Student
            </Typography>
          </DialogTitle>
          <Divider />
          <Box onSubmit={handleSubmit} component="form" noValidate>
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
                    value={addStudentForm.name}
                    onChange={(e) =>
                      handleAddStudentForm("name", e.target.value)
                    }
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
                    value={addStudentForm.lastName}
                    onChange={(e) =>
                      handleAddStudentForm("lastName", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      required
                      labelId="gender"
                      id="gender"
                      value={addStudentForm.gender}
                      label="Gender"
                      name="gender"
                      onChange={(e) =>
                        handleAddStudentForm("gender", e.target.value)
                      }
                      style={{ textAlign: "left" }}>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    label="Birthday"
                    required
                    fullWidth
                    id="birthday"
                    name="birthday"
                    autoComplete="birthday"
                    //value={value}
                    //onChange={(newValue) => setValue(newValue)}
                    value={date}
                    onChange={(newValue) => selectDate(newValue, 'age')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="age"
                    value={addStudentForm.age !== '' ? `${addStudentForm.age} years`: ' '}
                    disabled
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
                    value={addStudentForm.curp}
                    onChange={(e) =>
                      handleAddStudentForm("curp", e.target.value)
                    }
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
                    value={addStudentForm.address}
                    onChange={(e) =>
                      handleAddStudentForm("address", e.target.value)
                    }
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
                    value={addStudentForm.email}
                    onChange={(e) =>
                      handleAddStudentForm("email", e.target.value)
                    }
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
                    value={addStudentForm.phone}
                    onChange={(e) =>
                      handleAddStudentForm("phone", e.target.value)
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
    </LocalizationProvider>

    <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to eliminate the student?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <p>{`Se eliminara el alumno: ${addStudentForm.name}`}</p>
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
          onClick={handleClose}>Cancel</Button>
          <Button
          variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: "white",
                }}
           onClick={deleteStudent} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>



    </div>
  );
};

export default Students;
