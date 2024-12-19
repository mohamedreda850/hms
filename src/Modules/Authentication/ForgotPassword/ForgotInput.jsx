import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  AUTH_URL,
  axiosInstanceAdminAuth,
} from "./../../../Services/END_POINTS/ADMIN/URLS";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION } from "/src/Services/Validation/VALIDATION";

const ForgotInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingLeft: "40px", marginTop: "2rem" }}
      >
        <label>Email</label>
        <div>
          <input
            {...register("email", EMAIL_VALIDATION)}
            style={{
              background: "#F5F6F8",
              border: "none",
              width: "100%",
              height: "2.6rem",
              outline: "none",
              borderRadius: "4px",
              marginBlock: "10px",
              paddingLeft: "10px",
            }}
            type="email"
            placeholder="Please type here ..."
          />
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              width: "80%",
              background: "#3252DF",
              marginBlock: "3rem",
              textTransform: "none",
            }}
            variant="contained"
          >
            Send mail
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotInput;
