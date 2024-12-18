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
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../../Services/END_POINTS/ADMIN/URLS";
import { ADS_API } from "../../../../Services/END_POINTS/USER/URLS";
import styles from "./ADSList.module.css"; // Use your existing CSS file for styles
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// Define types for the ad data
interface Room {
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
}

interface Ad {
  _id: string;
  room: Room;
  isActive: boolean;
}

export default function ADSList() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // Track which dropdown is open

  const getAds = async () => {
    const response = await axiosInstanceAdmin.get<Ad>(ADS_API.GET_ALL_ADS);
    setAds(response.data.data.ads);
  };

  useEffect(() => {
    getAds();
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
    setDropdownOpen(dropdownOpen === id ? null : id); // Toggle dropdown open/close
  };

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          height: "100px",
          width: "95vw",
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
                      <div className={styles.menuItem}>
                        <EditIcon
                          sx={{
                            marginRight: "7px",
                            color: "#203FC7",
                          }}
                        />{" "}
                        Edit
                      </div>
                      <div className={styles.menuItem}>
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
      </TableContainer>
    </div>
  );
}
