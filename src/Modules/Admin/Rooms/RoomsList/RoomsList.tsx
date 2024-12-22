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
import { Button, InputLabel, Pagination, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


import { toast } from 'react-toastify';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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






export default function RoomsList() {
const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedIdRoom, setSelectedIdRoom] = useState('');

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    await getAllRooms(pageSize, page);
   
  };

const getAllRooms = async (pageSize: number, currentPage: number) => {
   

    try {
      const res = await axiosInstanceAdmin.get(ROOMS_URLS.GET_ALL_ROOMS,
        { params: { size: pageSize, page: currentPage }, })
      console.log(res.data.data.rooms);
      setRoomsList(res?.data?.data?.rooms);

      const totalCount = res?.data?.data?.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));

    } catch (error) {
      console.log(error);
    }
  };

  let deleteRoom = async () => {
    try {

      let response = await axiosInstanceAdmin.delete(ROOMS_URLS.DELETE_ROOM(selectedIdRoom));
      toast?.success('Item deleted successfuly');
      console.log(response)
      getAllRooms(pageSize, currentPage);
      handleCloseModal()
    } catch (error) {

      console.log(error);
      toast.error(error.response.data.message);
    }



  };

  useEffect(() => {
    getAllRooms(pageSize, currentPage);

  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    navigate(`/admin/rooms/${id}`)
  };
  const ITEM_HEIGHT = 48;
  const [openModal, setopenModal] = useState(false);
  const handleOpen = (id: string) => {
    setSelectedIdRoom(id);
    setopenModal(true);
  }
  const handleCloseModal = () => setopenModal(false);

  return (
    <>
      <DeleteConfirmation deleteItem={"Room"} deleteFunction={deleteRoom} handleClose={handleCloseModal} open={openModal} />
      <Stack
        direction="column"
      >
      
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            marginBlock: "10px"
          }}
        >
          <Typography variant="h5" gutterBottom>
            Rooms Table Details
          </Typography>
          <Button  variant="contained" onClick={()=>navigate("/admin/rooms/newroom")} size="large" >
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
              {roomsList.map((room: roomData) => (
                <StyledTableRow key={room._id}>
                  <StyledTableCell component="th" scope="row">
                    {room.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {room.images ? <img  style={{ width: "60px" , height:"60px"}} src={`${room.images[0]}`} alt='' /> : ''}
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

                        <MenuItem onClick={() => handleOpen(room._id)}>
                          delete<DeleteIcon color='primary' />
                        </MenuItem>
                        <MenuItem onClick={()=>handleClose(room._id)}>
                          update<OpenInNewIcon color='primary' />
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
          <Stack spacing={4} sx={{marginTop: "2rem", justifyContent: "center", alignItems: "center"}}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Stack>
      </Stack>


    </>

  )
}
