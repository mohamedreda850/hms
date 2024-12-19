import styles from './NavBar.module.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';




import Avatar from '@mui/material/Avatar';


import { Typography } from '@mui/material';
import { AuthContext } from '../../../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { AUTH_URL, axiosInstanceAdmin } from '../../../../Services/END_POINTS/ADMIN/URLS';



export default function NavBar() {
 
const { userId} = useContext(AuthContext)
const [userData, setUserData] = useState([])
const getUserprofile = async () => {
  try {
    
    const response = await axiosInstanceAdmin.get(AUTH_URL.USER_Profile(userId));
    console.log(response.data.data.user);
    
    setUserData(response.data.data.user)
  } catch (error) {
    console.log(error);
    
  }
}
useEffect(()=>{
  console.log(userId);
  
  getUserprofile()
  
},[])

  return (
    <AppBar position="static" sx={{backgroundColor:'#F8F9FB',color:'#000' , borderRadius:3 , boxShadow:0 }}>
    <Toolbar>
      
      <Box sx={{ flexGrow: 1 }} />
      <Avatar alt={userData?.userName}  />
      <Typography variant='body2' sx={{marginLeft:1}}>
      {userData?.userName}
      </Typography>
    </Toolbar>
  </AppBar>
  )
}
