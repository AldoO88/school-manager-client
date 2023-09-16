
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { amber, cyan, deepPurple, grey } from '@mui/material/colors';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {

    const { isLoggedIn, logout } = useContext(AuthContext)
    
    return(
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={ {bgcolor: cyan[700]}}>
        <Toolbar>
        <Link to='/'>
            <Button ariant="outlined" startIcon={<HomeIcon/>} sx={{color: 'white'}}>Home</Button>
        </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {
            !isLoggedIn && (
                <>
                <Link to='/signup'>
            <Button 
                sx={{
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white',
                  margin:1
                    
                }}>Signup</Button>
          </Link>
          
          <Link to='/login'>
            <Button 
                sx={{
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white',
                    
                }}>Login</Button>
          </Link>
                </>
            )
          }
        {
            isLoggedIn && (
                <>
                <Button 
                sx={{
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white',
                    
                }}
                onClick={(logout)}
                >Logout</Button>
                </>
            )
        }
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
    
}

export default Navbar;