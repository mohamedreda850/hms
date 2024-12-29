
import { Box, Container, Grid } from '@mui/material';
import { Typography } from '@mui/material';

import img1 from '../../../../assets/images/sec3-1.png'
import img2 from '../../../../assets/images/sec3-2.png'
import img3 from '../../../../assets/images/sec3-3.png'
import img4 from '../../../../assets/images/sec3-4.png'
export default function Section3() {
  return <>
  <Container sx={{marginTop:'70px'}}>
  <Typography sx={{fontSize:'2rem',fontWeight:'500',lineHeight:'36px', marginBottom:'20px'}}>
  Houses with beauty backyard
  </Typography>
  <div className="section3">
  <Grid container spacing={2}>
      <Grid item xs={3}>
      <Box
      sx={{
        position: "relative",
        width: "100%", // Set your desired width
        height: "100%", // Set your desired height
        overflow: "hidden",
      }}
    >
      <Box
      component="img"
      src={img1}
      alt=""
      sx={{
        width: '100%', // Example styles
        height: '100%',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: "15px",
        
      }}
    />
     <Typography
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "180px",
          height:'40px',
          backgroundColor: "#FF498B", // Semi-transparent background
          color: "#fff",
          padding: "8px",
          textAlign: "center",
          borderBottomLeftRadius:'15px',
          borderTopRightRadius:'15px',
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center"
        }}
      >
       Popular Choice
      </Typography>
      </Box>
        <Typography sx={{fontSize:'1.25rem',fontWeight:'400',lineHeight:'30px'}}>
        Tabby Town
        </Typography>
        <Typography sx={{fontSize:'0.9375rem',fontWeight:'300',lineHeight:'22.5px', color:'#B0B0B0'}}>
        Gunung Batu, Indonesia
        </Typography>
      </Grid>
      <Grid item xs={3}>
      <Box
      component="img"
      src={img2}
      alt=""
      sx={{
        width: '100%', // Example styles
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    />

        <Typography sx={{fontSize:'1.25rem',fontWeight:'400',lineHeight:'30px'}}>
        Anggana
        </Typography>
        <Typography sx={{fontSize:'0.9375rem',fontWeight:'300',lineHeight:'22.5px', color:'#B0B0B0'}}>
        Bogor, Indonesia
        </Typography>
      </Grid>
      <Grid item xs={3}>
      <Box
      component="img"
      src={img3}
      alt=""
      sx={{
        width: '100%', // Example styles
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    />

        <Typography sx={{fontSize:'1.25rem',fontWeight:'400',lineHeight:'30px'}}>
        Seattle Rain
        </Typography>
        <Typography sx={{fontSize:'0.9375rem',fontWeight:'300',lineHeight:'22.5px', color:'#B0B0B0'}}>
        Jakarta, Indonesia
        </Typography>
      </Grid>
      <Grid item xs={3}>
      <Box
      component="img"
      src={img4}
      alt=""
      sx={{
        width: '100%', // Example styles
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    />

        <Typography sx={{fontSize:'1.25rem',fontWeight:'400',lineHeight:'30px'}}>
        Wodden Pit
        </Typography>
        <Typography sx={{fontSize:'0.9375rem',fontWeight:'300',lineHeight:'22.5px', color:'#B0B0B0'}}>
        Wonosobo, Indonesia
        </Typography>
      </Grid>
      
    </Grid>
  </div>
  </Container>
  </>
}
