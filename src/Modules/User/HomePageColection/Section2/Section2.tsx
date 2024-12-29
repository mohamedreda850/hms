import { useEffect, useState } from "react";
import { ADS_URLS } from "../../../../Services/END_POINTS/ADMIN/URLS";
import { axiosInstanceUser, axiosInstanceUserAuth, FAVORITE_ROOMS_URLS } from "../../../../Services/END_POINTS/USER/URLS";
import { Box,  Typography ,IconButton, Stack, Container } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";



interface ImgComponentProps {
  source1: string;
  source2?: string;
  roomId1:string;
  roomId2:string;
}



export default function Section2() {

  const [ads, setAds] = useState([]);
  const HMStoken = localStorage.getItem("HMSToken");
const navigate = useNavigate()
   const ImgComponent: React.FC<ImgComponentProps>  =({source1,source2,roomId1,roomId2}) =>{
   return (
    <>
    
    <Stack
    direction="column"
    sx={{width:"33%"}}
    >
     <Stack  sx={{
      width:'100%',
      height: '100%',
      position: 'relative',
      display: 'inline-block',
      '&:hover .icon': {
        opacity: 1,
      },
    }}>
      <img src={source1} 
      style={{width:"100%",
      
      objectFit: 'cover',
      borderRadius: '8px',}} alt="img"/>
      
{HMStoken? <IconButton
    className="icon"
    onClick={() =>addToFav(roomId1)}
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
    <FavoriteIcon fontSize="large" />
  </IconButton>: ''}

  <IconButton
  onClick={()=>navigate(`explore-rooms/${roomId1}`)}
    className="icon"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      color: 'white', // Icon color
    }}
  >
    <VisibilityIcon fontSize="large" />
  </IconButton>
      
    </Stack>
    <Stack  sx={{
      width:'100%',
      height: '100%',
      position: 'relative',
      display: 'inline-block',
      '&:hover .icon': {
        opacity: 1,
      },
    }}>
      <img src={source2} 
      style={{width:"100%",
        height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',}} alt="img"/>
{HMStoken ? 
  <IconButton
  X
    className="icon"
    onClick={() =>addToFav(roomId2)}
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
     <FavoriteIcon fontSize="large" />
  </IconButton>: ''
}

  <IconButton
 onClick={()=>navigate(`explore-rooms/${roomId2}`)}
    className="icon"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      color: 'white', // Icon color
    }}
  >
    <VisibilityIcon fontSize="large" />
  </IconButton>
      
    </Stack>
    </Stack>
   
    </>
    
   )
  }

  const getAds = async () => {
     
  
      try {
        const res = await axiosInstanceUserAuth.get(ADS_URLS.GET_ALL_ADS)
        
        setAds(res?.data?.data?.ads);
      } catch (error) {
        console.log(error);
      }
    };

    
    let addToFav = async(id:string) => {
      try {
       let response = await axiosInstanceUser.post(FAVORITE_ROOMS_URLS.ADD_FAVORITE_ROOM,{
       roomId:id}
         );
       console.log(response)
       
       
      } catch (error) {
       console.log(error)
      }
     };

    useEffect(() => {
      
    getAds();
      
    }, [])
    
  return (
    <>
    <Container>
    <Typography variant="h5" gutterBottom>
    Most popular ads
    </Typography>
    
       <Grid container spacing={2} >
       <Stack
     direction="row"
     spacing={2}
    >
        <Stack
        sx={{
          width:'33%',
          position: 'relative',
          display: 'inline-block',
          '&:hover .icon': {
            opacity: 1,
          },
        }}
        >
         <img src={ads[0]?.room?.images[0]} 
          style={{width:"100%",
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',}} alt="img"/>
       {HMStoken ?
       <IconButton
       className="icon"
       onClick={() =>addToFav(ads[0].room._id)}
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
        <FavoriteIcon fontSize="large" />
     </IconButton> : '' 
       }   

  
      <IconButton
    className="icon"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '40%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      color: 'white', // Icon color
    }}
  >
    <VisibilityIcon fontSize="large" onClick={()=>navigate(`explore-rooms/${ads[0].room._id}`)}/>
  </IconButton>
        </Stack>
        
        {<ImgComponent source1={ads[1]?.room?.images[0]} source2={ads[2]?.room?.images[0]} roomId1={ads[1]?.room._id} roomId2={ads[2]?.room._id} />}
        {<ImgComponent source1={ads[3]?.room?.images[0]} source2={ads[4]?.room?.images[0]} roomId1={ads[3]?.room._id} roomId2={ads[4]?.room._id}/>}
        </Stack>
      </Grid>
      </Container>
    
    </>
  )
}
