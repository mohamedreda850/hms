
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import deleteimg from "./../../../../assets/images/Email (2).png"
import { Stack } from '@mui/material';
interface DeleteConfirmationProps {
  deleteItem: string;
  deleteFunction: () => void;
  handleClose: () => void;
  open: boolean;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ deleteItem, deleteFunction, handleClose, open }) => {

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}><img src={deleteimg} style={{ width: "25%" }} />
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Delete this {deleteItem}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2, textAlign: "center" }}>
                are you sure you want to delete this item ? if you are sure just click on delete it
              </Typography>
              <Stack spacing={2} direction='row' sx={{ mt: 2 }} >

                <Button variant='contained' onClick={handleClose}>Cansle</Button>
                <Button variant='contained' color='error' onClick={deleteFunction}>Delete</Button></Stack>
            </Stack>


          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default DeleteConfirmation;
//
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
