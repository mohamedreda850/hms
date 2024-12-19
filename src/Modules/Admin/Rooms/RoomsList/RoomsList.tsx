import styles from './RoomsList.module.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosInstanceAdmin, ROOMS_URLS } from '../../../../Services/END_POINTS/ADMIN/URLS';
import { Button, Pagination, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



interface roomData {
  
_id: string,
 roomNumber: string,
 price: number,
 discount: number,
 capacity: number,
 images?: object[]
}
  

type PageNumber = number[]



export default function RoomsList() {

  const [roomsList, setRoomsList] = useState([]);
  const [pageNumber, setPageNumber] = useState<PageNumber>([]);
  const [selectedIdRoom, setSelectedIdRoom] = useState('');
  



  const [openModal, setOpenModal] = useState(false);

  // const handleClickOpen = () => {
  //   setOpenModal(true);
  // };
  const handleCloseModal = () => {

    setOpenModal(false);
  };

  const handleShow = (id:any) => {
    setSelectedIdRoom(id)
    console.log(id)
    setOpenModal(true)};

  const getAllRooms= async (pageSize: number, pageNumber: number , numberaRoom?: string) => {
    // if (projectsList.length > 0) setLoad(false)
  
    try {
      const res = await axiosInstanceAdmin.get(ROOMS_URLS.GET_ALL_ROOMS, 
        {params: {pageSize: pageSize, pageNumber: pageNumber, numberaRoom: numberaRoom}})
      console.log(res.data.data.rooms);
      setRoomsList(res?.data?.data?.rooms);
      
      // setLoad(false)
      setPageNumber(Array(res?.data?.totalNumberOfPages).fill().map((_, i) => i+1))  
    } catch (error) {
      console.log(error);
    }
  };

  let deleteRoom = () => {
    try {
      let response = axiosInstanceAdmin.delete(ROOMS_URLS.DELETE_ROOM(selectedIdRoom))
    ;
      toast?.success('Item deleted successfuly');
      console.log(response)
      getAllRooms(2,1);
    } catch (error) {

      console.log(error);
      toast.error(error.response.data.message);
    }
    
    handleCloseModal()
    // deleteRoom()
  };
  
  useEffect(() => {
    getAllRooms(2,1);
  
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  return (
    <>
    <Stack
    direction="column"
    >
    
         <Stack
    direction="row"
    sx={{
      justifyContent:"space-between",
      marginBlock:"10px"
    }}
    >
      <Typography variant="h5" gutterBottom>
      Rooms Table Details
      </Typography>
      <Button type='submit' variant="contained" size="large" >
        Add New Room     
      </Button>
    </Stack>
     <TableContainer component={Paper}>
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Room Number</StyledTableCell>
          <StyledTableCell align="right">Image</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right">Discount</StyledTableCell>
          <StyledTableCell align="right">Capacity</StyledTableCell>
          {/* <StyledTableCell align="right">Category</StyledTableCell> */}
          <StyledTableCell align="right">Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {roomsList.map((room:roomData) => (
          <StyledTableRow key={room._id}>
            <StyledTableCell component="th" scope="row">
              {room.roomNumber}
            </StyledTableCell>
            <StyledTableCell align="right">
            {room.images ? <img className='w-25 h-25' style={{width:"20%"}} src={`${room.images[0]}`} alt=''/> : ''}
            </StyledTableCell>
            <StyledTableCell align="right">{room.price}</StyledTableCell>
            <StyledTableCell align="right">{room.discount}</StyledTableCell>
            <StyledTableCell align="right">{room.capacity}</StyledTableCell>
            <StyledTableCell align="right">
              <Stack >
              <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        
          <MenuItem   onClick={()=> handleShow(room._id)}>
           delete<DeleteIcon color='primary' />
          </MenuItem>
          <MenuItem   onClick={handleClose}>
           update<OpenInNewIcon color='primary'/>
          </MenuItem>
        
      </Menu>
              </Stack>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Stack>
  <Stack spacing={4}>
    <Pagination count={pageNumber.length} variant="outlined" shape="rounded" />
  </Stack>
  </Stack>
    </Stack>
    <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          
          <Typography gutterBottom>
            Are You sure ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={deleteRoom}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
 
    </>
   
  )
}
