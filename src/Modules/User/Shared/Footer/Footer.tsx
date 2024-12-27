import { Divider, Stack, Typography } from '@mui/material';
import Styles from './Footer.module.css';
import logoImg from "./../../../../assets/images/Staycation..png"
import Grid from '@mui/material/Grid2';

export default function Footer() {
  return (<><Divider />
    <Grid container rowSpacing={1} sx={{marginTop:3 , padding:5}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      
      <Grid size={{ xs: 8, md: 6 ,lg:3 ,}} sx={{width:'100%', }} >
        <Stack direction='column' >
          <img src={logoImg} alt="" style={{ width: "50%" }} />
          <Typography variant='body2' sx={{color:'#B0B0B0' , marginTop:2 }}>We kaboom your beauty holiday
            instantly and memorable.</Typography>
        </Stack>

      </Grid>
      <Grid size={{ xs: 8, md: 6 ,lg:3 }} sx={{width:'100%'}} >
      <Stack direction='column' >
        <Typography variant='h4' sx={{color:'#152C5B'}}>
        For Beginners
        </Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>New Account</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Start Booking a Room</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Use Payments</Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 8, md: 6 ,lg:3 }} sx={{width:'100%'}} >
      <Stack direction='column' >
      <Typography variant='h4' sx={{color:'#152C5B'}}>
      Explore Us
        </Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Our Careers</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Privacy</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Terms & Conditions</Typography>
        </Stack>
      </Grid>
      
      <Grid size={{ xs: 8, md: 6 ,lg:3 }} sx={{width:'100%'}} >
      <Stack direction='column' >
      <Typography variant='h4' sx={{color:'#152C5B'}} >
      Connect Us
        </Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>support@staycation.id</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>021 - 2208 - 1996</Typography>
        <Typography sx={{color:'#B0B0B0' , marginTop:2}} variant='body1'>Staycation, Kemang, Jakarta</Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <Typography sx={{textAlign:"center" ,marginTop:4 , color:"#B0B0B0"}}>Copyright 2019 • All rights reserved • Staycation</Typography>
      </Grid>
    </Grid>
    
    </>
  )
}
