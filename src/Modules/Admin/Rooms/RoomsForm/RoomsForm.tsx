import styles from "./RoomsForm.module.css";
import { Box, Divider, FormControl, Select, SelectChangeEvent, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { axiosInstanceAdmin, FACILITIES_URLS, ROOMS_URLS } from "../../../../Services/END_POINTS/ADMIN/URLS";
import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function RoomsForm() {
  const [facilitySelect, setFacilitySelect] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof facilitySelect>) => {
    const {
      target: { value },
    } = event;
    setFacilitySelect(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([])
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm();
  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);


    facilitySelect.forEach((facilityId) =>
      formData.append("facilities[]", facilityId)
    );



    formData.append("imgs", data.imgs[0]);


   
    try {
      const res = await axiosInstanceAdmin[params.id ? 'put' : 'post'](
        params.id ?
          ROOMS_URLS.UPDATE_ROOM(params.id)
          :
          ROOMS_URLS.ADD_ROOM
        , formData
      )
      
      navigate("/admin/rooms")

    } catch (error) {
      console.log(error);

    }

  };
  const getRoom = async (id: string) => {
    const { data } = await axiosInstanceAdmin.get(ROOMS_URLS.GET_ROOM(id))
    console.log(data);

    setValue("roomNumber", data?.data?.room.roomNumber)
    setValue("price", data?.data?.room.price)
    setValue("capacity", data?.data?.room.capacity)
    setValue("discount", data?.data?.room.discount)



  }
  const getFacilities = async () => {
    try {
      const response = await axiosInstanceAdmin.get(FACILITIES_URLS.GET_ALL_FACILITIES)
      
      setFacilities(response.data.data.facilities)
    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    (async () => {
      await getFacilities()
      

      if (params.id) {
        console.log(params.id);
        
        await getRoom(params.id);
      }
    })();
  }, []);

  return (
    <>
      <Stack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        direction="column"
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
          width: "50%",
          marginTop: "100px",
          marginX: "auto"
        }}
      >
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Room Number"
            variant="outlined"
            type="text"
            value={watch("roomNumber") || ""}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
            {...register("roomNumber", {
              required: "roomNumber is required",
            })}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignItems: "stretch",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            value={watch("price") || ""}
            error={!!errors.price}
            helperText={errors.price?.message}
            sx={{
              width: "100%",
            }}
            {...register("price", {
              required: "price is required",
            })}
          />
          <TextField
            id="outlined-basic"
            label="Capacity"
            variant="outlined"
            type="number"
            value={watch("capacity") || ""}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
            sx={{
              width: "100%",
            }}
            {...register("capacity", {
              required: "capacity is required",
            })}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignItems: "stretch",
            justifyContent: "space-between",
            width: "100%",
          }}

        >
          <TextField
            id="outlined-basic"
            label="Discount"
            variant="outlined"
            type="text"
            value={watch("discount") || ""}
            error={!!errors.discount}
            helperText={errors.discount?.message}
            sx={{
              width: "100%",
            }}
            {...register("discount", {
              required: "discount is required",
            })}
          />

          
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Facilities</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={facilitySelect}
                {...register("facilities")}
                label="Age"
                multiple
                onChange={handleChange}
                sx={{width: "100%"}}
              >
                {facilities?.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>{name}</MenuItem>
                ))}


              </Select>
            </FormControl>
          




        </Stack>
        <Stack spacing={2}>
          {/* <input type="file"
            {...register('imgs')}

          /> */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              {...register('imgs',{required: "image is required"})}
              onChange={(event) => console.log(event.target.files)}
              multiple

            />
          </Button>
        </Stack>
        <Divider sx={{ my: 50 }} orientation="horizontal" flexItem />
        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignItems: "stretch",
            justifyContent: "flex-end",
            width: "100%",

          }}
        >
          <Button onClick={() => { navigate("/admin/newroom") }} sx={{ backgroundColor: "white", color: "#203FC7", borderColor: "#203FC7", paddingBlock: 0.93, paddingInline: 3.8 }} variant="outlined">Cancel</Button>
          <Button type="submit" sx={{ backgroundColor: "#203FC7", color: "white", paddingBlock: 0.93, paddingInline: 2 }} variant="contained">{isSubmitting ? "Saveing..." : "Save"}</Button>

        </Stack>
      </Stack>



    </>
  );
}
