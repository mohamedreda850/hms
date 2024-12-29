import { IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstanceUser, FAVORITE_ROOMS_URLS } from '../../../Services/END_POINTS/USER/URLS';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface favRoomsData {

  rooms:favRoomData[]
 
}

interface favRoomData {

  _id:string
  images?:object[]
  capacity:number
  roomNumber:string

}

export default function Favorates() {
  const [favRoomsImg, setFavRoomsImg] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  
  const getMyRooms = async () => {
       
    
        try {
          const res = await axiosInstanceUser.get(FAVORITE_ROOMS_URLS.GET_ALL_FAVORITE_ROOMS)
          
          console.log(res?.data?.data?.favoriteRooms[0].rooms)
          setFavRoomsImg(res?.data?.data?.favoriteRooms[0].rooms);
          
    
        } catch (error) {
          console.log(error);
        }
      };

      let removeFromFav = async(id:any) => {
        try {
         let response = await axiosInstanceUser.delete(FAVORITE_ROOMS_URLS.DELETE_FAVORITE_ROOM(id),{data:{roomId:id,}},
        );
         console.log(response)
         
         getMyRooms();
        } catch (error) {
         console.log(error)
        }
       };


      
        useEffect(() => {
            
          getMyRooms();
            
          }, [])
  return (
    <>
    <Typography variant="h3" gutterBottom sx={{textAlign:'center',color:" #152C5B"}}>
    Your Favorites
    </Typography>
     
     <Link to='/' style={{textDecoration:'none', paddingInline:'20px'}}>Home</Link>
     <Typography  variant="h5" gutterBottom sx={{color:" #152C5B", paddingInline:'20px'}}>
    Your Rooms
    </Typography>
    <Stack spacing={5}  direction="row" sx={{paddingInline:'20px',flexWrap:"wrap"}}>
      {favRoomsImg?.map((room:favRoomData) =>(
      <Card key={room._id} sx={{ maxWidth: 345,
          position: 'relative',
          display: 'inline-block',
          '&:hover .icon': {
            opacity: 1,
          },
        }}>
       <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`${room.images[0]}`}
      />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {room.roomNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            capacitty : {room.capacity}
          </Typography>
        </CardContent>
        <IconButton
        className="icon"
        onClick={() => removeFromFav(room._id)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          color: 'white', // Icon color
        }}
      >
         <FavoriteBorderIcon fontSize="large" />
      </IconButton>
      </Card>
      ))}  
    
    </Stack>
    {/* <img src={`${favRooms[0]}`}/> */}
    {/* <h1>{favRooms[0]}</h1> */}
    
      
     
    </>
  )
}
