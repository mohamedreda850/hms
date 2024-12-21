import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Alert,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstanceAdmin, BOOKING_URLS } from '../../../Services/END_POINTS/ADMIN/URLS';

export default function BookingList() {
  const navigate = useNavigate();

  interface Room {
    roomNumber: string;
  }

  interface User {
    userName: string;
  }

  interface Booking {
    _id: string;
    room: Room;
    user: User;
    startDate: number;
    endDate: number;
    totalPrice: number;
  }

  const [booking, setBooking] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const getBookingList = async (pageSize: number, currentPage: number) => {
    try {
      const response = await axiosInstanceAdmin.get<Booking[]>(BOOKING_URLS.GET_ALL_booking, { params: { size: pageSize, page: currentPage }, });
      setBooking(response.data.data.booking);
      const totalCount = response?.data?.data?.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load booking data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookingList(pageSize, currentPage);
  }, []);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgba(226, 229, 235, 1)',
      color: 'rgba(30, 38, 62, 1)',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: '#333',
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/booking-details/${bookingId}`);
  };
  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    await getBookingList(pageSize, page);
   
  };

  const renderSkeletonRows = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <StyledTableRow key={index}>
        {Array.from({ length: 6 }).map((__, colIndex) => (
          <StyledTableCell key={colIndex} align="center">
            <Skeleton variant="text" width="80%" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));

  return (
    <Stack sx={{ overflow: 'hidden', width: '90vw' }}>
      <Box>
        <Typography variant="h4" sx={{ fontSize: '1.7rem', fontWeight: '500' }}>
          Booking Table Details
        </Typography>
        <Typography sx={{ marginBottom: '20px' }}>You can check all details</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}

      <Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
        <Table
      sx={{
        minWidth: 700,
        borderCollapse: 'collapse', // Ensures no gaps between cells
        '& td, & th': {
          border: 'none', // Remove borders from all cells
        },
      }}
      aria-label="customized table"
    >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Room Number</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">User</StyledTableCell>
                <StyledTableCell align="center">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                renderSkeletonRows()
              ) : booking.length > 0 ? (
                booking.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center">{row.room.roomNumber}</StyledTableCell>
                    <StyledTableCell align="center">{row.totalPrice}</StyledTableCell>
                    <StyledTableCell align="center">{formatDate(row.startDate)}</StyledTableCell>
                    <StyledTableCell align="center">{formatDate(row.endDate)}</StyledTableCell>
                    <StyledTableCell align="center">{row.user.userName}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Visibility
                        sx={{ cursor: 'pointer', color: '#1976d2' }}
                        onClick={() => handleViewDetails(row._id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={6}>
                    No bookings available.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
  );
}
