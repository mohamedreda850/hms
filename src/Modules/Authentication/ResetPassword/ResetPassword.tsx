import styles from "./ResetPassword.module.css";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import image from "../../../assets/images/Reset-passwordIMG.jpg";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AUTH_URL,
  axiosInstanceAdmin,
} from "../../../Services/END_POINTS/ADMIN/URLS";
import {
  EMAIL_VALIDATION,
  PASWORD_VALIDATION,
} from "../../../Services/Validation/VALIDATION";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ResetPasswordFormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  // Hook Form setup with types
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // To validate confirm password
  } = useForm<ResetPasswordFormData>();

  // The function to handle form submission
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstanceAdmin.post(
        AUTH_URL.RESET_PASSWORD,
        data
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      console.error("Error during OTP submission:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography className={styles.ResetHeader} margin={"0.5rem"}>
        <span className={styles.ResetHeaderchild}>Stay</span>cation.
      </Typography>

      <Stack
        direction={{ xs: "column-reverse", sm: "row" }} // Stack in column for small screens and row for larger screens
        spacing={5}
        sx={{
          justifyContent: "space-between",
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%" }, // Make the form take full width on small screens
          }}
        >
          <Stack
            direction="column"
            spacing={5}
            sx={{
              alignItems: "flex-start",
              width: "65%", // Ensure form section uses full width
            }}
          >
            <Typography variant="h3" gutterBottom>
              Reset Password
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              <Typography gutterBottom>
                If you already have an account{" "}
              </Typography>
              You can{" "}
              <Link
                to={"/auth/login"}
                style={{
                  color: "#Df4d44",
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                Login here!
              </Link>
            </Typography>
          </Stack>

          {/* Form Fields */}
          <Stack
            component="form"
            direction="column"
            spacing={3}
            sx={{
              justifyContent: "start",
              alignItems: "stretch",
              width: "65%",
              marginTop: "20px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <div>
              <Typography
                className={styles.ResetFormHeader}
                variant="subtitle2"
                gutterBottom
              >
                Email
              </Typography>
              <TextField
                id="outlined-email"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder="Please type here..."
                {...register("email", EMAIL_VALIDATION)}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            {/* OTP Field */}
            <div>
              <Typography
                className={styles.ResetFormHeader}
                variant="subtitle2"
                gutterBottom
              >
                OTP
              </Typography>
              <TextField
                id="outlined-otp"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder="Please type here..."
                {...register("seed", { required: "OTP is required" })}
                error={!!errors.seed}
                helperText={errors.seed?.message}
              />
            </div>
            <div>
              <Typography
                className={styles.ResetFormHeader}
                variant="subtitle2"
                gutterBottom
              >
                Password
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                sx={{
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder="Please type here..."
                {...register("password", PASWORD_VALIDATION)}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Typography
                className={styles.ResetFormHeader}
                variant="subtitle2"
                gutterBottom
              >
                ConfirmPassword
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                sx={{
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder="Please type here..."
                {...register("confirmPassword", {
                  required: "Confirmation password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords must match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Reset Button */}
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset"}
            </Button>
          </Stack>
        </Stack>

        {/* Image Section */}
        <Stack
          sx={{
            width: { xs: "100%", sm: "50%" }, // Use sx for responsive width
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
            alt="Reset Password"
          />
        </Stack>
      </Stack>
    </div>
  );
}
