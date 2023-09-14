import { useState } from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";

  import SchoolIcon from "@mui/icons-material/School";
import { amber, deepPurple, grey, indigo, red } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import studentService from "../services/students.service";


const FormStudent = (props) => {
    
    const { birthday } = props.dataForm;

    const [open, setOpen] = useState(props.open);
    const [addStudentForm, setAddStudentForm] = useState(props.dataForm);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [date, setDate] = useState(birthday);
    const [idStudentSelected, setIdStudentSelected] = useState(null);
    console.log('fecha por props', props.dataForm.birthday)
    console.log('fecha en componente', date)


      //const handleClose = () => {
        //setOpen(false);
        //setAddStudentForm(initAddStudentpForm);
        //setDate(dayjs(''));
      //};
    

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
    
            if(!props.idStudentSelected){
                const response = await studentService.createStudents(body);
                console.log("response: ", response.data);
                props.getAllStudent();
                setOpen(false);
                setAddStudentForm(props.dataForm);
                setDate(dayjs(props.dataForm));
            }else{
                const response = await studentService.updateStudents(idStudentSelected, body);
                console.log("response: ", response.data);
                props.getAllStudent();
                setOpen(false);
                setAddStudentForm(props.dataForm);
                setDate(dayjs(props.dataForm));
                setIdStudentSelected(null);
            }
         
          
        } catch (error) {
          console.log("error: ", error);
          setErrorMessage(error.response.data.message);
        }
      };

    const selectDate = ( dateSelected, nameField ) => {
        setDate(dateSelected)
        console.log('fecha seleccionada',dateSelected);
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
    return(
        <div>
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
                    value={dayjs(addStudentForm.birthday)}
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
                    value={ props.age ===  addStudentForm.age ? `${addStudentForm.age} years` : `${props.age} years`}
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
                onClick={props.handleClose}>
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
                Add
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
    </LocalizationProvider>
        </div>
    )
}

export default FormStudent;