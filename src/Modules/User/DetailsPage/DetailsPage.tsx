import './DetailsPage.css'
import { useNavigate, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import img2 from '../../../assets/images/Screenshot 2024-12-26 194154.png'
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import { axiosInstanceUser, ROOM_COMMENTS_URLS, ROOM_REVIEWS_URLS, ROOMS_URL } from '../../../Services/END_POINTS/USER/URLS'

interface rateData {
  roomId: string,
  rating: number,
  review: string,
}

interface commentData {
  roomId: string,
  comment: string
}

export default function DetailsPage() {
  const [room, setRoom] = useState(null)
  const {roomId} = useParams()
  const [value, setValue] = useState<number | null>(2);
  const navigate = useNavigate()
  // Payment===============================
  const {register, handleSubmit,} = useForm({defaultValues: {roomId: roomId}});
  
  const { register: registerRate, handleSubmit: handleRateSubmit, setValue: setValueRate  } = useForm({defaultValues: {roomId: roomId}});
  const { register: registerComment, handleSubmit: handleCommentSubmit } = useForm({defaultValues: {roomId: roomId}});

  const getRoom = async () => {
    try {
      const res = await axiosInstanceUser.get(ROOMS_URL.GET_ROOM(roomId))
      console.log(res);
      
      setRoom(res?.data?.data?.room)
    } catch (error) {
      console.log(error);
    }
  }

  const rateRoom = async (data: rateData) => {
    try {
      const res = await axiosInstanceUser.post(ROOM_REVIEWS_URLS.ADD_ROOM_REVIEW,data)
      console.log(res);
      toast.success(res?.data?.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  
  const createComment = async (data: commentData) => {
    try {
      const res = await axiosInstanceUser.post(ROOM_COMMENTS_URLS.ADD_ROOM_COMMENT,data)
      console.log(res);
      toast.success(res?.data?.message)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
 
  useEffect(() => {
    if (roomId) {
      getRoom()
    }
  }, [roomId])

  return (
    <Box component="section" sx={{maxWidth: '1142px',color: '#152C5B', margin: {lg: '0px auto', md: '0px auto', sm: '0px auto', xs: '0px auto'}, padding: '30px 20px'}}>
      <Box sx={{marginBottom: '70px'}}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 600, fontSize: '36px' }}>{room?.roomNumber}</Typography>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '18px', color: '#B0B0B0' }}>Home     /    <span style={{color: '#152C5B', fontWeight: 'bold'}}> Room Details</span></Typography>
      </Box>
        <Box className="room-details">
            <Box className="room-image">
              {room?.images.map((item: string) => {
                return <img src={item} alt="" />
              })}
                {/* <img src={img} alt="" />
                <img src={img} alt="" />
                <img src={img} alt="" /> */}
            </Box>
            <Box sx={{display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: 8}}>
                <Box className="room-description" sx={{maxWidth: '600px'}}>
                    <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', color: '#B0B0B0' }}>
                        Minimal techno is a minimalist subgenre of techno music. 
                        It is characterized by a stripped-down aesthetic that exploits 
                        the use of repetition and understated development. 
                        Minimal techno is thought to have been originally developed 
                        in the early 1990s by Detroit-based producers Robert Hood and 
                        Daniel Bell.
                    </Typography>
                    <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', color: '#B0B0B0', marginBlock: 2 }}>
                        Such trends saw the demise of the soul-infused techno that 
                        typified the original Detroit sound. Robert Hood has noted 
                        that he and Daniel Bell both realized something was missing 
                        from techno in the post-rave era.
                    </Typography>
                    <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', color: '#B0B0B0' }}>
                        Design is a plan or specification for the construction of 
                        an object or system or for the implementation of an activity
                        or process, or the result of that plan or specification in 
                        the form of a prototype, product or process. The national 
                        for design: enabling Singapore to use design for economic 
                        growth and to make lives better.
                    </Typography>
                </Box>
                <Box className="continue-book" sx={{p: {lg: '40px', md: '40px', sm: '20px', xs: '10px'}}}>
                    <Typography variant='body1' sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize: '20px', color: '#152C5B', paddingBottom: 3 }}>Start Booking</Typography>
                    <Typography variant='h4' sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize: '36px', color: '#B0B0B0' }}><span style={{color: '#1ABC9C'}}>${room?.price}</span> per night</Typography>
                    <Typography variant='body1' sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#FF1612' }}>Discount {room?.discount}% Off </Typography>
                    <Box sx={{paddingTop: '70px'}}>
                        <form>
                            <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#152C5B'}} variant="body1" component="h2">Pick a Date</Typography>
                            <Box className="box" sx={{display: 'flex'}}>
                            <img src={img2} alt="" />
                            <Box className="inputs">
                                <input type="date" {...register('startDate')}/>-
                                <input type="date" {...register('endDate')}/>
                            </Box>
                            </Box>
                            <Button type='submit' sx={{paddingInline: 8, marginTop: 5}} variant="contained">Continue Book </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box sx={{border: '1px solid #E5E5E5', p: 5, marginTop: 8, borderRadius: '15px'}}>
                <Grid container spacing={{lg: 12, md:12, sm:6, xs: 6}}>
                    <Grid size={{lg: 5, md: 5, sm: 12, xs: 12}}>
                        <Box className="rate">
                            <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#152C5B', marginBottom: 3}} variant="body1" component="h2">Rate</Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                setValueRate('rating', newValue)
                                }}
                            />
                            <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#152C5B'}} variant="body1" component="h2">Message</Typography>
                            <form onSubmit={handleRateSubmit(rateRoom)}>
                                <Box sx={{marginBlock: 2}}>
                                    <TextField sx={{width: '100%', display: 'none'}} multiline  rows={4} id="outlined-basic" label="Message" variant="outlined" 
                                    {...registerRate('roomId')}/>
                                    <TextField sx={{width: '100%', display: 'none'}} multiline  rows={4} id="outlined-basic" label="Message" variant="outlined" 
                                    {...registerRate('rating')}/>
                                    <TextField sx={{width: '100%'}} multiline  rows={4} id="outlined-basic" label="Message" variant="outlined" 
                                    {...registerRate('review')}/>
                                </Box>
                                <Button type='submit' sx={{paddingInline: 8, marginTop: 3}} variant="contained">Rate</Button>
                            </form>
                        </Box>  
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid size={{lg: 5, md: 5, sm: 12, xs: 12}}>
                        <Box className="comment">
                            <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '16px', color: '#152C5B', marginBottom: 12}} variant="body1" component="h2">Add Your Comment</Typography>
                            <form onSubmit={handleCommentSubmit(createComment)}>
                                <Box>
                                    <TextField sx={{width: '100%', display: 'none'}} multiline  rows={4} id="outlined-basic" label="Add Your Comment" variant="outlined" 
                                    {...registerComment('roomId')}/>
                                    <TextField sx={{width: '100%'}} multiline  rows={4} id="outlined-basic" label="Add Your Comment" variant="outlined" 
                                    {...registerComment('comment')}/>
                                </Box>
                                <Button type='submit' sx={{paddingInline: 8, marginTop: 5}} variant="contained">Send</Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Box>
  )
}
