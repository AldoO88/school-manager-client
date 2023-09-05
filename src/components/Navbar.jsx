
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { deepOrange, indigo } from '@mui/material/colors';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const Navbar = () => {

    const { isLoggedIn, user, logout } = useContext(AuthContext)
    
    return(
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={ {bgcolor: deepOrange[500]}}>
        <Toolbar>
        <Link to='/'>
            <Button color="inherit">Home</Button>
        </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {
            !isLoggedIn && (
                <>
                <Link to='/signup'>
            <Button 
                sx={{
                  bgcolor: indigo[900],
                  ":hover": { bgcolor: deepOrange[900] },
                  color: 'white',
                  margin:1
                    
                }}>Signup</Button>
          </Link>
          
          <Link to='/login'>
            <Button 
                sx={{
                  bgcolor: indigo[900],
                  ":hover": { bgcolor: deepOrange[900] },
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
                  bgcolor: indigo[900],
                  ":hover": { bgcolor: deepOrange[900] },
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