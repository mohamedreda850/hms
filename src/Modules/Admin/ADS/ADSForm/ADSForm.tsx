import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import {
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
interface ADSFormProps {
  roomsApi: any;
  onSubmit: any;
  open: any;
  handleClose: any;
  register: any;
  handleSubmit: any;
  isSubmitting: any;
  isEditing: any;
}
const ADSForm :React.FC<ADSFormProps> = ({
  roomsApi,
  onSubmit,
  open,
  handleClose,
  register,
  handleSubmit,
  isSubmitting,
  isEditing,
}) => {
  const [rooms, setRoom] = useState("");
  const [active, setActive] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (event: SelectChangeEvent) => {
    setRoom(event.target.value as string);
  };
  const handleActiveChange = (event: SelectChangeEvent) => {
    setActive(event.target.value as string);
  };
  return (
    <>
      <div>
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
              <Box
                sx={style}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid2
                  container
                  spacing={2}
                  sx={{ paddingInline: "20px", marginBottom: "40px" }}
                >
                  <Grid2 size={6}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {isEditing ? "Edit Ad" : "Add New Ad"}
                    </Typography>
                  </Grid2>
                  <Grid2 size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        
                        cursor: "pointer",
                       color: "red",
                       
                      }}
                      id="transition-modal-title"
                      
                    >
                      X
                    </IconButton>
                  </Grid2>
                </Grid2>

                <Stack sx={{ alignItems: "center" }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">
                      Rooms Number
                    </InputLabel>

                    <Select
                      {...register("room")}
                      sx={{ width: "100%" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={rooms}
                      label=""
                      disabled={isEditing}
                      onChange={handleChange}
                    >
                      {roomsApi.map((room) => (
                        <MenuItem key={room._id} value={room._id}>
                          {room.roomNumber}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      {...register("discount")}
                      sx={{ width: "100%", marginBlock: "10px" }}
                      id="outlined-basic"
                      label="Discount"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">EGP</InputAdornment>,
                      }}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">
                      Active
                    </InputLabel>
                    <Select
                      {...register("isActive")}
                      sx={{ width: "100%" }}
                      value={active}
                      label="Active"
                      onChange={handleActiveChange}
                    >
                      <MenuItem value={"true"}>Yes</MenuItem>
                      <MenuItem value={"false"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Divider />
                <Divider />

                <Stack sx={{ alignItems: "end", marginTop: "30px" }}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                      textTransform: "none",
                      width: "6.5rem",
                      height: "2rem",
                      background: "#203FC7",
                    }}
                    variant="contained"
                  >
                    {isSubmitting ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ADSForm;
