import styles from './Login.module.css';
import { IconButton, InputAdornment, Stack } from "@mui/material";
import image from "../../../assets/images/loginImg.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { AUTH_URL, axiosInstanceAdminAuth } from '../../../Services/END_POINTS/ADMIN/URLS';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import { EMAIL_VALIDATION, PASWORD_VALIDATION } from '../../../Services/Validation/VALIDATION';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { jwtDecode } from 'jwt-decode';
import { CleaningServices } from '@mui/icons-material';
interface loginData {
  email: string;
  password: string;
}


export default function Login() {
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginData>()
  const onSubmit = async (data: loginData) => {
    try {
      const response = await axiosInstanceAdminAuth.post<loginData>(AUTH_URL.LOGIN, data)
      localStorage.setItem('HMSToken', response.data.data.token)
      const token: any = response?.data?.data?.token;
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken); const role = decodedToken.role;
      saveLoginData();
      toast.success(response?.message || 'Login Successfully');
      navigate(`${role === "admin" ? '/admin/' : '/'}`)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Login failed');
    }


  }
  const handlePassword = () => {
    setIsPasswordVisable(!isPasswordVisable)
  }
  return <>
    <Stack
      direction="row"
      spacing={5}
      sx={{
        justifyContent: "space-between",
        alignItems: "stretch",
        overflow: "hidden"
      }}
    >
      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Stack
          direction="column"
          spacing={5}
          sx={{
            alignItems: "flex-start",
            width: "50%",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            If you don’t have an account register
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            You can <Link to={'/auth/register'} style={{ color: "#152C5B", fontSize: "1rem" }}> Register here !</Link>
          </Typography>
        </Stack>


        <form onSubmit={handleSubmit(onSubmit)}
          style={{
            justifyContent: "center",
            alignItems: "stretch",
            width: "50%",
            marginTop: "20px",
          }}
        >
          <Stack spacing={2}>
            <TextField id="outlined-basic" label="Email" variant="outlined"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email',EMAIL_VALIDATION)}
            >
            </TextField>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={isPasswordVisable ? "text" : "password"}
              helperText={errors.email?.message}

              {...register('password', PASWORD_VALIDATION)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {isPasswordVisable ? <IconButton aria-label="delete" onClick={handlePassword}> <VisibilityOffIcon /></IconButton>
                      : <IconButton aria-label="delete" onClick={handlePassword}> <RemoveRedEyeIcon /></IconButton>}
                  </InputAdornment>
                ),
              }}
            >
            </TextField>

            <div style={{ textAlign: "end" }}><Link style={{ textDecoration: "none" }} to={'/auth/forgot-password'}>Forgot Password</Link></div>


          </Stack>
          <Button  type='submit' variant="contained" size="large" >
            LogIn
          </Button>

        </form>

      </Stack>
      <div
        style={{
          width: "50%",
        }}
      >
        <img
          src={image}
          style={{
            width: "100%",
            height: "97vh",
            objectFit: "fill",
            borderRadius: "10px ",
          }}
          alt="logo"
        />
      </div>
    </Stack>
  </>
}
