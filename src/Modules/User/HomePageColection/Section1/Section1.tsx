import './Section1.css'
import img from '../../../../assets/images/banner.png'
import img2 from '../../../../assets/images/Screenshot 2024-12-26 194154.png'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

interface dateData {
  startDate: string,
  endDate: string
}

export default function Section1() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: dateData) => {
    // console.log(data);
    navigate(`/explore-rooms?startDate=${data.startDate}&endDate=${data.endDate}`)
  }
  return (
    <>
      <Container sx={{ minHeight: 'calc(92vh - 64px)', padding: '0 20px'}}>
        <Grid container spacing={2}>
          <Grid size={{lg: 6, md: 6, sm: 6, xs: 12}}>
            <Box component="section" sx={{marginTop: '70px'}}>
              <Box>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: 700, fontSize: '42px', color: '#152C5B', lineHeight: '63px',width: {lg: '100%', md: '100%', sm: '100%', xs: '100%' }}} variant="h1" component="h2">Forget Busy Work,<br/>Start Next Vacation</Typography>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px',color: '#B0B0B0', width: {lg: '100%', md: '100%',sm: '100%', xs: '100%' }, lineHeight: '27.2px'}} variant="body1" component="h2">We provide what you need to enjoy your holiday with family. Time to make another memorable moments.</Typography>
                <Box sx={{marginTop: '37px'}}>
                  <Typography sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize: '20px', color: '#152C5B'}} variant="body1" component="h2">Start Booking</Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#152C5B'}} variant="body1" component="h2">Pick a Date</Typography>
                    <Box className="box" sx={{display: 'flex'}}>
                      <img src={img2} alt="" />
                      <Box className="inputs">
                        <input type="date" {...register('startDate')}/>-
                        <input type="date" {...register('endDate')}/>
                      </Box>
                    </Box>
                    <Button type='submit' sx={{paddingInline: 8, marginTop: 5}} variant="contained">Explore</Button>
                  </form>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{lg: 6, md: 6, sm: 6, xs: 12}}>
            <Box sx={{marginLeft: {lg: '100px', md: '100px'}, marginTop: '70px', width: {lg: '470px', md: '400px', sm: '400px'}}}>
              <img style={{width: '100%', height: '450px'}} src={img} alt="" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
