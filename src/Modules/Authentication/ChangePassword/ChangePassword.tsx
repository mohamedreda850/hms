import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { AUTH_URL, axiosInstanceAdmin } from "../../../Services/END_POINTS/ADMIN/URLS";


interface ChangeData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [type, setType] = useState("password");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm<ChangeData>();

  const onSubmit: SubmitHandler<ChangeData> = async (data:ChangeData) => {
    try {
      const res = await axiosInstanceAdmin.post(AUTH_URL.CHANGE_PASSWORD, data)
      console.log(res)
      toast.success("Password changed!");
     
      navigate("/auth/login");
    } catch (error: any) {
      console.log(error)

      toast.error(error?.response?.data?.message || "Oops, something went wrong! ");
    }
  };

  const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (<>    <Stack direction="column" spacing={8} sx={{ justifyContent: "center", alignItems: "center" , mt: 10 }}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Change Your Password
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Ensure your account's security by changing your password regularly.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Old Password */}
              <Box>
                <Typography sx={{ color: "#152C5B", mb: 0.5 }}>Old Password</Typography>
                <TextField
                  type={type}
                  fullWidth
                  required
                  {...register("oldPassword", { required: "Old password is required" })}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => toggleVisibility(setType)}>
                          {type === "password" ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* New Password */}
              <Box>
                <Typography sx={{ color: "#152C5B", mb: 0.5 }}>New Password</Typography>
                <TextField
                  type={typePassword}
                  fullWidth
                  required
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => toggleVisibility(setTypePassword)}>
                          {typePassword === "password" ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Confirm New Password */}
              <Box>
                <Typography sx={{ color: "#152C5B", mb: 0.5 }}>Confirm New Password</Typography>
                <TextField
                  type={typeConfirmPassword}
                  fullWidth
                  required
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match",
                  })}             
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => toggleVisibility(setTypeConfirmPassword)}>
                          {typeConfirmPassword === "password" ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
              </Box>

              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Changing Password..." : "Change Password"}
              </Button>
            </Stack>
          </form>
           
        </Box>
      </Container>
      
    </Stack>
 
  </>

        
  );
}
