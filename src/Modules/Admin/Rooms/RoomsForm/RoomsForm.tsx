import styles from "./RoomsForm.module.css";
import { Box, Divider, FormControl, IconButton, InputAdornment, Select, SelectChangeEvent, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstanceAdmin, FACILITIES_URLS, ROOMS_URLS } from "../../../../Services/END_POINTS/ADMIN/URLS";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
  const [facilities, setFacilities] = useState([])
  const params= useParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const onSubmit = async (data1) => {
    const formData = new FormData();
    formData.append("roomNumber", data1?.roomNumber);
    formData.append("price", data1?.price);
    formData.append("capacity", data1?.capacity);
    formData.append("discount", data1?.discount);
    facilities.forEach((facility:string)=>
     formData.append('facilities[]',facility)
    )
    formData.append("imgs", data1?.images[0]);
    const response=await axiosInstanceAdmin[params.id?'put':'post'](
      params.id?
        ROOMS_URLS.UPDATE_ROOM(params.id)
        :
        ROOMS_URLS.ADD_ROOM
      ,formData
    )
  };
  const getRoom =async(id:string)=>{
    const {data}=await axiosInstanceAdmin.get(ROOMS_URLS.GET_ROOM(id))
    console.log(data);
    
    setValue("roomNumber",data?.roomNumber)
    setValue("price",data?.price)
    setValue("capacity",data?.capacity)
    setValue("discount",data?.discount)
   setValue("facilities", data?.facilities);

   }   
   const getFacilities =async()=>{
    try {
      const response=await axiosInstanceAdmin.get(FACILITIES_URLS.GET_ALL_FACILITIES)
      console.log(" facility " ,response.data.data.facilities)
      setFacilities(response.data.data.facilities)
    } catch (error) {
      console.log(error);
      
    }
   
   }
  useEffect(() => {
      (async () => {
        await getFacilities()
        console.log(facilities);
        
        if (params.id) {
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
          marginX:"auto"
        }}
      >
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Room Number"
            variant="filled"
            type="text"
            error={!!errors.roomNumber}
            helperText={errors.roomNumber?.message}
            {...register("roomNumber", {
              required: "roomNumber is required",
            })}
          ></TextField>
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
            variant="filled"
            type="number"
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
            variant="filled"
            type="number"
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
            variant="filled"
            type="text"
            error={!!errors.discount}
            helperText={errors.discount?.message}
            sx={{
              width: "100%",
            }}
            {...register("discount", {
              required: "discount is required",
            })}
          />
          
    <Box sx={{ minWidth: 120 }}>
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
         
        >  
        {facilities?.map(({_id,name})=>(
             <MenuItem key={_id} value={name}>{name}</MenuItem>
        ))}
          
          
        </Select>
      </FormControl>
    </Box>
  

          

        </Stack>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            variant="filled"
            type="file"
           
            {...register("imgs",)}
            
          />
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
          <Button sx={{ backgroundColor: "white", color: "#203FC7", borderColor:"#203FC7",paddingBlock:0.93,paddingInline:3.8}}  variant="outlined">Cancel</Button>
          <Button type="submit" sx={{ backgroundColor: "#203FC7", color: "white" ,paddingBlock:0.93,paddingInline:2}} variant="contained">Save</Button>

        </Stack>
      </Stack>
     

      
    </>
  );
}
