import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";


export default function MasterAdminLayout() {
  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SideBar/>
      <Outlet />
    </Stack>

  )
}
