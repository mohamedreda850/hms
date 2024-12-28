import './FacilitiesList.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { ThreeDot } from "react-loading-indicators";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstanceAdmin, FACILITIES_URLS } from '../../../../Services/END_POINTS/ADMIN/URLS';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
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

interface facilitiesData {
  _id: number
  name: string,
  createdAt: number
}

interface facilityData {
  name: string
}

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState([])
  const [load, setLoad] = useState(true)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [id, setId] = useState(0)
  const [openModal, setopenModal] = useState(false);
  

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    handleSubmit,
  } = useForm();


  const handleClickOpenCreate = (id: number) => {
    if (id !== 0) {
      const getFacility = async () => {
        try {
          const res = await axiosInstanceAdmin.get(FACILITIES_URLS.GET_FACILITY(id))
          console.log(res);
          
          setValue('name', res?.data?.data?.facility?.name)
        } catch (error) {
          console.log(error);
        }
      }
      getFacility()
    }
    setOpenCreate(true);
    reset({name: ''})
    setId(id)
  };
  
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const getFacilities = async () => {
    if (facilities.length > 0) setLoad(false)
    try {
      const res = await axiosInstanceAdmin.get(FACILITIES_URLS.GET_ALL_FACILITIES)
      console.log(res);
      setFacilities(res?.data?.data?.facilities)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFacility = async () => {
    setDeleteLoad(true)
    try {
      const res = await axiosInstanceAdmin.delete(FACILITIES_URLS.DELETE_FACILITY(id))
      console.log(res);
      
      getFacilities()
      toast.success('Deleted Successfully')
      setDeleteLoad(false)
      setopenModal(false)
    } catch (error) {
      console.log(error);
      setDeleteLoad(false)
    }
  }
  const handleCloseModal = () => setopenModal(false);
  const createFacility = async (data: facilityData) => {
    try {
      const res = await axiosInstanceAdmin[id === 0 ? 'post' : 'put'](
        id === 0 ? FACILITIES_URLS.ADD_FACILITY : FACILITIES_URLS.UPDATE_FACILITY(id), data)
      console.log(res);
      handleCloseCreate()
      getFacilities()
      toast.success(id === 0 ? res?.data?.message : res?.data?.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }
  const handleOpen = (id: string) => {
    setId(id);
    setopenModal(true);
  }
  useEffect(() => {
    getFacilities()
  }, [])

  return (
    <>
      <Box component="section" sx={{p: 4, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>Facilities Table Details</Typography>
          <Typography variant="body2" component="h2" sx={{fontSize: '14px', }}>You can check all details</Typography>
        </Box>
        <Stack spacing={2} direction="row">
          <Button type='button' variant="contained" sx={{paddingInline: 3}} onClick={() => {
            handleClickOpenCreate(0)
          }}>Add New Facility</Button>
        </Stack>
      </Box>
      {/* ================= Delete =============== */}
     <DeleteConfirmation deleteItem='Facilite' deleteFunction={deleteFacility} handleClose={handleCloseModal} open={openModal} deleteLoad={deleteLoad}/>
      {/* ============================= */}

      {/* ============== Create =============== */}
      <BootstrapDialog
        onClose={handleCloseCreate}
        aria-labelledby="customized-dialog-title"
        open={openCreate}
      >
        <form onSubmit={handleSubmit(createFacility)}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {id===0 ?'Add Facility' : 'Edit Facility'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseCreate}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{width: '500px'}}>
          <Box sx={{textAlign: 'center'}}>
              <Box sx={{marginBlock: 3}}>
                <TextField id="outlined-basic" label="Name" variant="outlined" sx={{width: '100%'}}
                helperText={errors?.name?.message}
                error={!!errors?.name}
                type="text"
                // focused={id === 0 ? true : true}
                {...register('name',  {
                  required: 'Name is required'
                })} />
              </Box>
          </Box>
          </DialogContent>
        <DialogActions>
          <Button type='submit' sx={{marginBlock: 2, paddingInline: 5}} autoFocus variant="contained" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
            Save
          </Button>
        </DialogActions>
        </form>
      </BootstrapDialog>
      {/* ===================================== */}
      <Box component="section" sx={{p: 4}}  onClick={() => {
        if (activeMenuId) setActiveMenuId(null)
      }}>
        <TableContainer component={Paper} sx={{maxHeight: '70vh'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Date Created</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            {load && <StyledTableCell sx={{textAlign: 'center'}} className='py-5 text-center' colSpan={3}><ThreeDot color="#3f31cc" size="medium" text="" textColor="#NaNNaNNaN" /></StyledTableCell>}
            <TableBody>
              {load ? '' : facilities.length > 0 ? facilities.map((item: facilitiesData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{new Date(item?.createdAt).toISOString().split('T')[0]}</StyledTableCell>
                  <StyledTableCell align="center" className='action'>
                    <Button className='btn-menu' onClick={() => setActiveMenuId(prevId => (prevId === item?._id ? null : item?._id))}>
                      <i style={{cursor:"pointer", color: 'black'}} className="fa-solid fa-ellipsis"></i>
                    </Button>
                    <List sx={{p: 0}} className={`menu ${activeMenuId === item?._id ? 'show' : ''}`}>
                      
                        <ListItem className='list-item'>
                          <Button className='btn-menu' onClick={() => {
                          handleClickOpenCreate(item?._id)
                        }}>
                            <i title='Edit' className="fa-solid fa-pen-to-square text-primary"></i> 
                            <ListItemText primary="Edit" />
                          </Button>
                        </ListItem>
                      <ListItem className='list-item'>
                        <Button className='btn-menu' onClick={() => {
                          handleOpen(item?._id)
                        }}>
                          <i title='Delete' className="fa-solid fa-trash text-primary"></i> 
                          <ListItemText primary="Delete" />
                        </Button>
                      </ListItem>
                    </List>
                  </StyledTableCell>
                </StyledTableRow>
              )) :  <StyledTableRow>
                      <StyledTableCell className='py-5 text-center' colSpan={3}>
                        {'No Data ....'}
                      </StyledTableCell>
                    </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

