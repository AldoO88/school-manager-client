import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, ListItemAvatar } from '@mui/material';
import { amber, deepPurple, pink } from '@mui/material/colors';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

const data = [
  { icon: <People />, label: 'Teachers' },
  { icon: <Diversity2Icon />, label: 'Groups' },
  { icon: <AutoStoriesIcon />, label: 'Subjects' },
  { icon: <SchoolIcon />, label: 'Students' },
  { icon: <CalendarMonthIcon />, label: 'Schedule' },

];

const dataTeachers = [
  { icon: <CalendarMonthIcon />, label: 'Schedule' },
  { icon: <Diversity2Icon />, label: 'Groups' },
  { icon: <AutoStoriesIcon />, label: 'Subjects' },

];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const Listbar = (props) => {  

    const { isLoggedIn, user } = React.useContext(AuthContext)
    const [open, setOpen] = React.useState(true);
    return (
        
        
      <Box sx={{ display: 'flex', width: 256}}>

      {
        isLoggedIn 
        
         ?
         user.profile === 'Director' || user.profile === 'Coordinador' || user.profile === 'Subdirector' ? 
          <Paper elevation={0} sx={{ maxWidth: 256, height: 900,  bgcolor: deepPurple[500]}}>
            <FireNav component="nav" disablePadding >
              <ListItemButton component="a" href="#customized-list">
              <ListItemAvatar >
              <Avatar sx={{ bgcolor: pink[300], color: 'white' }}>{user.name.substr(0,1)}{user.lastName.substr(0,1)}</Avatar>
              </ListItemAvatar>
              
                <ListItemText
                  sx={{ my: 0 }}
                  primary={`${user.name} ${user.lastName}` }
                  secondary={user.profile}
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,
                    color: 'white',
                    '&:hover': amber[700]
                  }}
                  secondaryTypographyProps={{
                    color: 'white'
                  }}
                />
                <br/>
              </ListItemButton>
        
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? deepPurple[500] : null,
                  pb: open ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Build"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                      color: 'white'
                    }}
                    secondary="Teachers, Subjects, Students, School, Groups"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {open &&
                  data.map((item) => (
                    <Link to={`/${item.label.toLowerCase()}`}>
                    <ListItemButton
                      key={item.label}
                      sx={{ py: 0, minHeight: 62, color: 'rgba(255,255,255,.8)',  '&:hover': deepPurple[700]}}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                      />
                    </ListItemButton>
                    </Link>
                  ))}
              </Box>
            </FireNav>
          </Paper>
          :
          <Paper elevation={0} sx={{ maxWidth: 256, height: 900,  bgcolor: deepPurple[500]}}>
            <FireNav component="nav" disablePadding >
              <ListItemButton component="a" href="#customized-list">
              <ListItemAvatar >
              <Avatar sx={{ bgcolor: pink[300], color: 'white' }}>{user.name.substr(0,1)}{user.lastName.substr(0,1)}</Avatar>
              </ListItemAvatar>
              
                <ListItemText
                  sx={{ my: 0 }}
                  primary={`${user.name} ${user.lastName}` }
                  secondary={user.profile}
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,
                    color: 'white',
                    '&:hover': amber[700]
                  }}
                  secondaryTypographyProps={{
                    
                    color: 'white'
                  }}
                 
                />
                <br/>
              </ListItemButton>
        
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? deepPurple[500] : null,
                  pb: open ? 2 : 0,
                }}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="Build"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                      color: 'white'
                    }}
                    secondary="Teachers, Subjects, Students, School, Groups"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {open &&
                  dataTeachers.map((item) => (
                    <Link to={`/${item.label.toLowerCase()}`}>
                    <ListItemButton
                      key={item.label}
                      sx={{ py: 0, minHeight: 62, color: 'rgba(255,255,255,.8)',  '&:hover': deepPurple[700]}}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }}
                      />
                    </ListItemButton>
                    </Link>
                  ))}
              </Box>
            </FireNav>
          </Paper>
        :
       <></>
      
      }
      </Box>
    );
}

export default Listbar;