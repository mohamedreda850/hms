import { Stack } from '@mui/material';
import styles from './Dashboard.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import CardContent from '@mui/material/CardContent';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Typography from '@mui/material/Typography';
import { axiosInstanceAdmin, DASHBOARD_URLS } from '../../../Services/END_POINTS/ADMIN/URLS';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { PieChart } from '@mui/x-charts/PieChart';
import { Label } from '@mui/icons-material';



export default function Dashboard() {
  const [dashData, setDashData] = React.useState([])
  
  const getDashboard = async () => {
    try {
      const { data } = await axiosInstanceAdmin.get(DASHBOARD_URLS.GET_DASHBOARD);
      console.log(data.data);
      setDashData(data.data)
     
    } catch (error) {
      console.log(error);

    }
  }
  React.useEffect(() => {
    getDashboard()
  }, [])
  const pieChartData = [
    { id: 'Pending', value: dashData?.bookings?.pending || 0 ,color: '#5368F0', label: 'Pending'},
    { id: 'Completed', value: dashData?.bookings?.completed || 0 , color: '#9D57D5' , label: 'Completed'},
  ];
  const pieChartDataUsers = [
    { id: 'Users', value: dashData?.users?.user || 0 ,color: '#54D14D', label: 'Users'},
    { id: 'Admins', value: dashData?.users?.admin || 0 , color: '#35C2FD' , label: 'Admins'},
  ];
  return (
    <Stack direction='column'  className={styles.dashboard}>
      <Stack direction="row" sx={{ justifyContent: 'space-around' , marginTop:4}}>
        <Card sx={{ minWidth: 240, backgroundColor: 'black', color: 'white' , padding:1.5 , borderRadius:3}}>
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {dashData?.rooms}
                <br />
                Rooms
              </Typography>
              <DashboardOutlinedIcon />
            </Stack>
          </CardContent>

        </Card>
        <Card sx={{ minWidth: 240, backgroundColor: 'black', color: 'white' , padding:1.5 ,borderRadius:3 }}>
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {dashData?.facilities}
                <br />
                Facilities
              </Typography>
              <AddHomeWorkIcon />
            </Stack>
          </CardContent>

        </Card>
        <Card sx={{ minWidth: 240, backgroundColor: 'black', color: 'white' , padding:1.5 ,borderRadius:3 }}>
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {dashData?.ads}
                <br />
                ADS
              </Typography>
              <CalendarMonthOutlinedIcon />
            </Stack>
          </CardContent>

        </Card>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-around' , marginTop:4}}>
      <PieChart
      series={[
       
        {
          data: pieChartData,
          
          cx: 200,
          cy: 150,
          innerRadius: 60,
          outerRadius: 100,
          
        },
      ]}
      height={300}
      width={500}
      slotProps={{
        legend: { hidden: false    },
      }}
    />
     <PieChart
      series={[
       
        {
          data: pieChartDataUsers,
          
          cx: 200,
          cy: 150,
          innerRadius: 80,
          outerRadius: 100,
          
        },
      ]}
      height={300}
      width={500}
      slotProps={{
        legend: { hidden: false    },
      }}
    />
      </Stack>
    </Stack>
  )
}
