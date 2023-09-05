import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import { Alert, FormControl, MenuItem, Paper, Select } from "@mui/material";
import { deepOrange, indigo, pink } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const initSignupForm = {
    name: '',
    lastName: '',
    profile: '',
    email: '',
    password: ''
}

const Signup = () => {
    const [ signupForm, setSignupForm ] = useState(initSignupForm);
    const [ errorMessage, setErrorMessage ] = useState(undefined)

    const navigate = useNavigate()

    const handleSignupForm = (nameField, value) => {
    setSignupForm(prevState => ({ ...prevState, [nameField]: value }))
    }

    const handleSubmit = async  (event) => {
        event.preventDefault();
        try {
            // const response = await axios.post(`${API_URL}/auth/signup`, signupForm)
            const response = await authService.signup(signupForm)
            console.log('response: ', response.data)
            navigate('/login')
        } catch (error) {
            console.log('error: ', error);
            setErrorMessage(error.response.data.message)
        }
        
      };

  return (
    
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://comunicacionsocial.senado.gob.mx/images/galerias/banco/educacion1.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: indigo[900] }}>
              <HowToRegIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
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
                    value={signupForm.name}
                    onChange={(e) => handleSignupForm('name', e.target.value)}
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
                    value={signupForm.lastName}
                    onChange={(e) => handleSignupForm('lastName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="profile">Profile</InputLabel>
                    <Select
                      required
                      labelId="profile"
                      id="profile"
                      value={signupForm.profile}
                      label="Profile"
                      name="profile"
                      onChange={(e) => handleSignupForm('profile', e.target.value)}
                      style={{ textAlign: "left" }}>
                      
                      <MenuItem value={"Docente"}>Docente</MenuItem>
                      <MenuItem value={"Director"}>Director</MenuItem>
                      <MenuItem value={"Subdirector"}>Subdirector</MenuItem>
                      <MenuItem value={"Coordinador"}>Coordinador</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={signupForm.email}
                    onChange={(e) => handleSignupForm('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={signupForm.password}
                    onChange={(e) => handleSignupForm('password', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: deepOrange[500],
                  ":hover": { bgcolor: deepOrange[700] },
                }}>
                Sign Up
              </Button>

              { errorMessage && <Alert severity="error">{errorMessage}</Alert> }

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
};

export default Signup;
