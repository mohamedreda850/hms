import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import image from "./../../../../src/assets/images/Group 33 (1).png";
import imageProfile from '../../../../src/assets/images/register-image.png';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';
import { axiosInstanceUser, axiosInstanceUserAuth } from '../../../Services/END_POINTS/USER/URLS';
import { AUTH_URL } from '../../../Services/END_POINTS/ADMIN/URLS';
import { toast } from 'react-toastify';
import { EMAIL_VALIDATION } from '../../../Services/Validation/VALIDATION';
import { useState } from 'react';


interface RegisterData {
  userName: string,
  email: string,
  country: string,
  phoneNumber: string,
  profileImage: string,
  password: string,
  confirmPassword: string,
  role:string 
}


export default function Register() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [typePassword, setTypePassword] = useState('password')
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')

  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue
  } = useForm();

  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('country', data.country)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('profileImage', data?.profileImage[0])
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('role', 'user')

    try {
      const res = await axiosInstanceUserAuth.post(AUTH_URL.REGISTER, formData)
      console.log(res);
      // navigate('/verify-account', {state: {email: data.email}})
      toast?.success(res?.data?.message)
    } catch (error: any) {
      toast?.error(error?.response?.data?.message) 
      console.log(error)
      const errors = error?.response?.data?.additionalInfo?.errors
      for (const key in errors) {
        toast?.error(errors[key][0])
      }     
    }    
  }

  // const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setValue('profileImage', file)
  //     setImagePreview(URL.createObjectURL(file))
  //   }
  // }


  const typeChangePassword = () => {
    if (typePassword === 'password')  setTypePassword('text') 
    else setTypePassword('password') 
  }

  const typeChangeConfirmPassword = () => {
    if (typeConfirmPassword === 'password')  setTypeConfirmPassword('text') 
    else setTypeConfirmPassword('password') 
  }

  return (
    <>
    <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "stretch",
        overflow:"hidden"
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
            spacing={2}
            sx={{
              alignItems: "flex-start",
              width: "50%",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              If you don’t have an account register
            </Typography>
            <Typography variant="subtitle2"  gutterBottom>
              You can <Link  to='/auth/login' style={{color:"red" ,fontSize:"1rem" ,textDecoration:"none"}}> login !</Link>
            </Typography>
          </Stack>
          {/* form  */}
         
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            direction="column"
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
              width: "50%",
              marginTop: "20px",
            }}
          >
            {/* user name  */}
            <TextField id="outlined-basic" label="User Name" 
            variant="outlined" 
            placeholder='please type here...' sx={{background: "#F5F6F8"}}
            {...register('userName', {
              required: 'User name is required',
            })}
             />
            {errors?.userName && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.userName?.message)}</p>}
            <Stack
            direction="row"
            spacing={2}
            >
              <Stack
            direction="column"
            spacing={1}
            >

              {/* phone number  */}
              <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
            />
            {errors?.phoneNumber && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.phoneNumber?.message)}</p>}
            </Stack>
            {/* country  */}
            <Stack
            direction="column"
            spacing={1}
            >
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              {...register('country', {
                required: 'Country is required',
              })}
            />
             {errors?.country && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.country?.message)}</p>}
             </Stack>
            </Stack>
            {/* email  */}

            <TextField id="outlined-basic" 
            label="Email Address" variant="outlined" 
            placeholder='please type here...' 
            sx={{background: "#F5F6F8"}}
            {...register('email', EMAIL_VALIDATION)}
             />
             {errors?.email && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.email?.message)}</p>}

            {/* password */}
           <div className={styles["password"]}>
            <TextField id="outlined-basic" 
            label="Password" variant="outlined" 
            placeholder='please type here...'
            type={typePassword} 
            sx={{background: "#F5F6F8"}}
            {...register('password', {
              required: 'Password is required'
            })}
             />
             {typePassword === 'password' ? <button type='button' onClick={typeChangePassword}>
                  <i className="fa-solid fa-eye-slash"></i>
                </button> : <button type='button' onClick={typeChangePassword}><i className="fa-solid fa-eye"></i></button>}
            </div>    
            {errors?.password && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.password?.message)}</p>}
            {/* confirmPassword  */}

           <div className={styles["password"]}>
            <TextField id="outlined-basic" 
            label="Confirm Password" 
            variant="outlined" 
            placeholder='please type here...' 
            sx={{background: "#F5F6F8"}}
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (confirmPassword) =>
                confirmPassword === watch('password') || "Password do not match",
            })}
             />
             {typeConfirmPassword === 'password' ? <button type='button' onClick={typeChangeConfirmPassword}>
                  <i className="fa-solid fa-eye-slash"></i>
                </button> : <button type='button' onClick={typeChangeConfirmPassword}><i className="fa-solid fa-eye"></i></button>}
              </div>   
            {errors?.confirmPassword && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.confirmPassword?.message)}</p>}

                <div className='imageProfile text-center'>
            <label htmlFor='image' style={{cursor:'pointer'}}>
              <img src={imagePreview ? imagePreview : imageProfile} alt="" />
            </label>
            <input type="file" id='image' style={{display: 'none'}}
            {...register('profileImage')}
           />
            {/* <img src={imagePreview ? imagePreview : imageProfile} alt="" /> */}
          </div>
            
            
            <Button type='submit' variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting? "sign up..." : "sign up"}
            </Button>
          </Stack>
          
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
  )
}
