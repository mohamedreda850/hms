import styles from './NavBar.module.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { AuthContext } from '../../../../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';




export default function NavBar() {
 


const [userCall, setUseCall] = useState()
const {userData} = useContext(AuthContext)
useEffect(()=>{
  if (userData){
   
 
   setUseCall(userData.data.data.user)
   console.log(userData.data.data.user.userName)
  }
  
  
  
},[userData])

  return (
    <AppBar position="static" sx={{backgroundColor:'#F8F9FB',color:'#000' , borderRadius:3 , boxShadow:0 }}>
    <Toolbar>
      
      <Box sx={{ flexGrow: 1 }} />
      <Avatar src={userCall?.profileImage}   />
      <Typography variant='body2' sx={{marginLeft:1}}>
      {userCall?.userName}
      </Typography>
    </Toolbar>
  </AppBar>
  )
}
