import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import List from '@mui/material/List';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import IconButton from '@mui/material/IconButton';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor:"#203FC7",
  color:"#fff"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor:"#203FC7",
  color:"#fff"
});





const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);
export default function SideBar() {

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function  logOut(){
    localStorage.removeItem("HMSToken")
    navigate("/")
  }
  return (

    


      <Drawer variant="permanent" open={open}>
      
        <List >
        {open ? (
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={{ marginLeft:"auto" ,display: 'block'}}
        >
          <ChevronLeftIcon />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginLeft:"auto", display: 'block' }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
<ListItem >
  <ListItemButton onClick={()=>navigate("/admin")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText
    primary={'home'} sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
     
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
<ListItemButton onClick={()=>navigate("/admin/usersList")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      Users
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
<ListItemButton onClick={()=>navigate("/admin/rooms")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <DashboardOutlinedIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      Rooms
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
<ListItemButton onClick={()=>navigate("/admin/ads")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <CalendarMonthOutlinedIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      ADS
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
<ListItemButton onClick={()=>navigate("/admin/booking")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <BookmarksOutlinedIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      Booking
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
<ListItemButton onClick={()=>navigate("/admin/facilities")} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <AddHomeWorkIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      Facilites
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem onClick={()=>navigate("/admin/change-password")}  sx={{marginTop:"-15px"}}>
  <ListItemButton sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <LockOpenOutlinedIcon />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      ChangePassword
    </ListItemText>
  </ListItemButton>
</ListItem>
<ListItem sx={{marginTop:"-15px"}}>
  <ListItemButton onClick={logOut} sx={[
          {
            
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
    <ListItemIcon  sx={[
          {
            color:"#fff",
            minWidth: 0,
            justifyContent: 'center',
            
          },
          open
            ? {
              mr: 3,
            }
            : {
              mr: 'auto',
            },
            
        ]}>
      <LogoutIcon  />
    </ListItemIcon>
    <ListItemText sx={[
          open
            ? {
              opacity: 1,
            }
            : {
              opacity: 0,
            },
        ]}>
      Logout
    </ListItemText>
  </ListItemButton>
</ListItem>
          
        </List>
        
      </Drawer>

    
  )
 }
