import TextField from '@mui/material/TextField';
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  AUTH_URL,
  axiosInstanceAdminAuth,
} from "../../../Services/END_POINTS/ADMIN/URLS";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION } from '../../../Services/Validation/VALIDATION';

interface IForgotInput {
  email: string;
}
const ForgotInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotInput>();
  const onSubmit = async (data: IForgotInput ) => {
    
    try {
      let res = await axiosInstanceAdminAuth.post(
        AUTH_URL.FORGOT_PASSWORD,
        data
      );
      console.log(res.data);

      toast.success("Check Your Email");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Stack
      component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingLeft: "40px", marginTop: "2rem" }}
      >


        <TextField 
        type="email" 
        id="outlined-basic" label="Email" variant="outlined" helperText={errors.email?.message} {...register("email", EMAIL_VALIDATION)} sx={{
          width: "100%"
        }} />
        <Button
        disabled={isSubmitting}
          type="submit"
          sx={{
            width: "100%",
            background: "#3252DF",
            marginBlock: "3rem",
            textTransform: "none",
          }}
          variant="contained"
        >
          {isSubmitting? "Sending...":"Send mail"}
        </Button>

      </Stack>
    </>
  );
};

export default ForgotInput;
