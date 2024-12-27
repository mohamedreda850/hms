import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import styles from './NavBar.module.css'
import imgLogo from "./../../../../assets/images/Staycation..png"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext';


import { axiosInstanceUser } from '../../../../Services/END_POINTS/USER/URLS';
import { AUTH_URL, axiosInstanceAdmin } from '../../../../Services/END_POINTS/ADMIN/URLS';
import { Stack } from '@mui/material';
import { set } from 'react-hook-form';


export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
 
  const navigate = useNavigate();
  const { userData } = React.useContext(AuthContext);
const [loginData, setLoginData] = React.useState()
  const logOut = () => {
    localStorage.removeItem("HMSToken");
    location.reload()
  };

  const pages = [<Link className={`${styles["link-decor"]}`} to="/">Home</Link>, <Link className={`${styles["link-decor"]}`} to="/explore-rooms">Explore</Link>, <Button onClick={() => { navigate("/auth/register") }} variant="contained">Register</Button>, <Button onClick={() => { navigate("/auth/login") }} variant="contained">  Login</Button>];
  const loginPages = [<Link className={`${styles["link-decor"]}`} to="/">Home</Link>, <Link className={`${styles["link-decor"]}`} to="/explore-rooms">Explore</Link>, <Link className={`${styles["link-decor"]}`} to="/explore-rooms">Favorits</Link>]
  const settings = [<Button onClick={logOut} variant='text'>Log out</Button>];


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(()=>{
   if (userData){
    
    setLoginData(userData.data.data.user)
    console.log(userData)
   }
    
  
  },[userData])
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            <img src={imgLogo} alt="" style={{ width: '13%' }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {loginData ? loginPages.map((page, idx) => ( <MenuItem key={idx} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>)) : (
              pages.map((page , idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>

              ))
            )}
              
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <img src={imgLogo} alt="" style={{ width: "50%" }} />
          </Box>


          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {loginData ? loginPages.map((page, idx) => (<Button
              key={idx}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>)) : (
              pages.map((page , idx) => (
                <Button
                  key={idx}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>

              ))
            )}

          </Box>
          {loginData && <Stack direction='row' sx={{ flexGrow: 0 , alignItems:'center' , marginLeft:2}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <MenuItem key={idx} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant='body2' sx={{color:"black" , marginLeft:2}}>{loginData?.userName}</Typography>
          </Stack>}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
