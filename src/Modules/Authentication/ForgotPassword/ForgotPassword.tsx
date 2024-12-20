
import styles from "./ForgotPassword.module.css";
import Stack from "@mui/material/Stack";
import ForgotPassImg from "./ForgotPassImg";
import ForgotInput from "./ForgotInput.tsx";
import ForgotTitle from './ForgotTitle.tsx';

export default function ForgotPassword() {
  return (
    <>
    <Stack
        direction="row"
        spacing={5}
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
            spacing={5}
            sx={{
              alignItems: "flex-start",
              width: "50%",
            }}
          >
            <ForgotTitle/>
          </Stack>

          <Stack
            
            direction="column"
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
              width: "50%",
              marginTop: "20px",
            }}
          >
            <ForgotInput />
          </Stack>
        </Stack>
        <ForgotPassImg />
      </Stack>
        
    </>
  );
}
