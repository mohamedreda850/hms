import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";


export default function MasterAdminLayout() {
  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <SideBar/>
      <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
        <NavBar />
      <Outlet />
      </Stack>
    </Stack>

  )
}
