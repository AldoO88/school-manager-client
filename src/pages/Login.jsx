import * as React from 'react';
import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { deepOrange, indigo } from '@mui/material/colors';
import authService from '../services/auth.service';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';


const initLoginForm = {
    email: '',
    password: ''
}

const Login = () =>{

    const [ loginForm, setLoginForm ] = useState(initLoginForm);
    const [ errorMessage, setErrorMessage ] = useState(undefined)

    const handleLoginForm = (nameField, value) => {
        setLoginForm(prevState => ({ ...prevState, [nameField]: value }))
    }
    const navigate = useNavigate()
    const { storeToken,  authenticateUser } = useContext(AuthContext); 

        const handleLogin = async (event) => {
            event.preventDefault();
            try {
                // const response = await axios.post(`${API_URL}/auth/login`, loginForm)
                // console.log('JWT token', response.data.authToken );
                const response = await authService.login(loginForm)
                storeToken(response.data.authToken); 
      
      
                // tratamos de autenticar al user
                authenticateUser();
      
                navigate('/');            
              } catch (error) {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
              }

          };
        
          return (
              <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: indigo[900] }}>
                      <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => handleLoginForm('email', e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handleLoginForm('password', e.target.value)}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: deepOrange[500], ":hover": { bgcolor: deepOrange[700] }}}
                      >
                        Sign In
                      </Button>
                      { errorMessage && <Alert severity="error">{errorMessage}</Alert> }
                      <Grid container>
                        <Grid item xs>
                          
                          <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: 'url(https://science-teaching.org/wp-content/uploads/2022/12/stem-banner-que-es-educacion-stem.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
          );
    
}

export default Login