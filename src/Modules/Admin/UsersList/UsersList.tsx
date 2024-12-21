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
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstanceAdmin, USERS_URL } from '../../../Services/END_POINTS/ADMIN/URLS';

export default function UsersList() {
  const navigate = useNavigate();

  interface User {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: number;
    country: string;
    createdAt: number;
    role: string;
    profileImage: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const getUsersList = async (pageSize: number, currentPage: number) => {
    try {
      const res = await axiosInstanceAdmin.get(USERS_URL.GET_ALL_USERS, { params: { size: pageSize, page: currentPage }});
      setUsers(res.data.data.users);
      const totalCount = res?.data?.data?.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersList(pageSize, currentPage);
  }, []);
  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    await getUsersList(pageSize, page);
   
  };
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
      backgroundColor: 'rgba(248, 249, 251, 1)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#ffffff',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/user-details/${userId}`);
  };

  const renderSkeletonRows = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <StyledTableRow key={index}>
        {Array.from({ length: 8 }).map((__, colIndex) => (
          <StyledTableCell key={colIndex} align="center">
            <Skeleton variant="text" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))
  );

  return (
    <Stack sx={{ overflow: 'hidden', width: '90vw' }}>
      <Box>
        <Typography variant="h4" sx={{ fontSize: '1.7rem', fontWeight: '500' }}>
          Users Table Details
        </Typography>
        <Typography sx={{ marginBottom: '20px' }}>
          You can check all details
        </Typography>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
          <Table
            sx={{
              minWidth: 700,
              borderCollapse: 'collapse',
              '& td, & th': {
                border: 'none',
              },
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Profile Image</StyledTableCell>
                <StyledTableCell align="center">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? renderSkeletonRows()
                : users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell align="center">{user.userName}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="center">{user.country}</StyledTableCell>
                    <StyledTableCell align="center">{user.role}</StyledTableCell>
                    <StyledTableCell align="center">{formatDate(user.createdAt)}</StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={user.profileImage || '/path/to/placeholder.jpg'}
                        alt={user.userName}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Visibility
                        sx={{ cursor: 'pointer', color: '#1976d2' }}
                        onClick={() => handleViewDetails(user._id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack spacing={4} sx={{ marginTop: "2rem", justifyContent: "center", alignItems: "center" }}>
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
