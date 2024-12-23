import {
  Button,
  IconButton,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../../Services/END_POINTS/ADMIN/URLS";
import { ADS_API } from "../../../../Services/END_POINTS/USER/URLS";
import styles from "./ADSList.module.css"; // Use your existing CSS file for styles
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ADSForm from "../ADSForm/ADSForm";
import React from "react";

import { SelectChangeEvent } from "@mui/material/Select";

import {
  ADS_URLS,
  ROOMS_URLS,
} from "../../../../Services/END_POINTS/ADMIN/URLS";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";

// Define types for the ad data
interface Room {
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  _id: string;
}

interface Ad {
  _id: string;
  room: Room;
  isActive: boolean;
}

interface roomsApi {
  _id: string;
  room: { roomNumber: string };
  isActive: boolean;
}

export default function ADSList() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // Track which dropdown is open
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const getAds = async (pageSize: number, currentPage: number) => {
    try {
       const response = await axiosInstanceAdmin.get<Ad>(ADS_API.GET_ALL_ADS , { params: { size: pageSize, page: currentPage }, });
    setAds(response?.data?.data?.ads);
    const totalCount = response?.data?.data?.totalCount || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      
    }
   
  };
  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    await getAds(pageSize, page);
   
  };
  //modal
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const getRooms = async () => {
    try {
      const { data } = await axiosInstanceAdmin.get<roomsApi>(
        ROOMS_URLS.GET_ALL_ROOMS
      );
      setRoomsApi(data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const [roomsApi, setRoomsApi] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        try {
          const { room, ...updateData } = data;
             const response = await axiosInstanceAdmin.put(
          ADS_URLS.UPDATE_ADS(roomId),
          updateData
        );
        console.log(response.data);
        toast.success("ADS Update Successfully");
        } catch (error) {
          console.log(error);
          
        }
     
        
  
      } else {
        const response = await axiosInstanceAdmin.post(ADS_URLS.ADD_ADS, data);
        console.log(response.data);
        
  
        toast.success("ADS Added Successfully");
      }
      getAds();
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setRoomId("");
  };

  const handleEditAd = (ad: Ad) => {
    setRoomId(ad._id);
    setIsEditing(true);
    setValue("room", ad.room._id);
    setValue("discount", ad.room.discount);
    setValue("isActive", ad.isActive ? "true" : "false");
    setOpen(true);
  };
  useEffect(() => {
    getAds(pageSize, currentPage);
    getRooms();
  }, []);

  const getCapacity = (capacity: number): string => {
    switch (capacity) {
      case 1:
        return "Single Room";
      case 2:
        return "Double Room";
      case 3:
        return "Triple Room";
      default:
        return "Room";
    }
  };

  const handleClick = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id); 
  };
  
  const [selectedADId, setselectedADId] = useState('');
  const [openModal, setopenModal] = useState(false);
  const handleDeleteModalOpen = (id: string) => {
    console.log(id);
    
    setselectedADId(id);
    setopenModal(true);
  }
  const handleCloseModal = () => setopenModal(false);
  const deleteAd = async () => {
    try {
      const response = await axiosInstanceAdmin.delete(ADS_URLS.DELETE_ADS(selectedADId));
      toast.success("ADS Deleted Successfully");
      getAds(pageSize, currentPage);
      handleCloseModal();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <DeleteConfirmation deleteItem={"AD"} deleteFunction={deleteAd} handleClose={handleCloseModal} open={openModal} />
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          height: "100px",
          width: "90vw",
          justifySelf: "center",
          marginX: "auto",
        }}
      >
        <div>
          <Typography
            variant="h1"
            sx={{ marginBottom: "0", fontSize: "1.5rem", fontWeight: "400" }}
          >
            ADS Table Details
          </Typography>
          <Typography variant="h4" sx={{ fontSize: "1rem", marginTop: "0" }}>
            You can check all details
          </Typography>
        </div>
        <div>
          <Button
            onClick={() => handleOpen()}
            sx={{
              backgroundColor: "#203FC7",
              color: "white",
              width: "12vw",
              textTransform: "none",
              height: "38px",
              borderRadius: "10px",
            }}
          >
            Add New Ads
          </Button>
        </div>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ border: "none", boxShadow: "none" }}
      >
        <Table
          sx={{ minWidth: 650, borderCollapse: "collapse" }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              backgroundColor: "#E2E5EB",
              height: "4rem",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Capacity</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ backgroundColor: index % 2 === 0 ? "white" : "#F8F9FB" }}
              >
                <TableCell component="th" scope="row">
                  {row.room.roomNumber}
                </TableCell>
                <TableCell align="center">{row.room.price}</TableCell>
                <TableCell align="center">{row.room.discount}</TableCell>
                <TableCell align="center">
                  {getCapacity(row.room.capacity)}
                </TableCell>
                <TableCell align="center">
                  {row.isActive ? "YES" : "NO"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    position: "relative",
                  }}
                >
                  <IconButton onClick={() => handleClick(row._id)}>
                    <MoreHorizIcon />
                  </IconButton>
                  {dropdownOpen === row._id && (
                    <div className={styles.dropdownMenu}>
                      <div
                        onClick={() => handleEditAd(row)}
                        className={styles.menuItem}
                      >
                        <EditIcon
                          sx={{
                            marginRight: "7px",
                            color: "#203FC7",
                          }}
                        />{" "}
                        Edit
                      </div>
                      <div onClick={() => handleDeleteModalOpen(row._id)} className={styles.menuItem}>
                        {" "}
                        <DeleteIcon
                        
                          sx={{
                            marginRight: "7px",
                            color: "#203FC7",
                          }}
                        />
                        Delete
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack spacing={4} sx={{marginTop: "2rem", justifyContent: "center", alignItems: "center"}}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
      </TableContainer>
      {/* modal */}
      <ADSForm
        roomsApi={roomsApi}
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
        register={register}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />
    </div>
  );
}
