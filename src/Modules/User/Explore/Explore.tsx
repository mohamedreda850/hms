import {
  Breadcrumbs,
  Container,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../../assets/images/notFound1.png";

import {
  axiosInstanceUser,
  ROOMS_URL,
} from "../../../Services/END_POINTS/USER/URLS";

type room = {
  roomNumber: number;
  facilities: [{ _id: number; name: string }];
  _id: number;
  images: string;
  price: string;
};

export default function Explore() {
  const [getRooms, setGetRooms] = useState<room[]>([]);
  const params = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    if(params.startDate && params.endDate){
      await handleRooms(pageSize, page , params.startDate , params.endDate);}else{await handleRooms(pageSize, page);}
    
  

  };
  const handleRooms = async (pageSize: number, currentPage: number , startDate? :string, endDate? :string) => {
    const res = await axiosInstanceUser.get(ROOMS_URL.GET_ALL_ROOMS ,{ params: { size: pageSize, page: currentPage , startDate:startDate ,endDate:endDate  }, });
    console.log(res.data.data.rooms);
    setGetRooms(res.data.data.rooms);
    const totalCount = res?.data?.data?.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));
  };
  useEffect(() => {
if(params.startDate && params.endDate){
  handleRooms(pageSize, currentPage , params.startDate , params.endDate);
}else{handleRooms(pageSize, currentPage);}
    
    console.log("params", params.startDate);

  }, []);

  return (
    <>
      <Container maxWidth="lg" className="explore">
        <Stack sx={{ alignItems: "center" }}>
          <Typography
            sx={{ color: "#152C5B", fontSize: "2.25rem", fontWeight: "600" }}
          >
            Explore ALL Rooms{" "}
          </Typography>
        </Stack>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "4.5rem" }}>
          <Link style={{ textDecoration: "none", color: "#B0B0B0" }} to="/">
            Home
          </Link>
          <Typography>Explore</Typography>
        </Breadcrumbs>
        <Typography
          sx={{
            color: "#152C5B",
            fontSize: "1.5rem",
            fontWeight: "500",
            marginBlock: "20px",
          }}
        >
          All Rooms
        </Typography>
        <Stack>
          <Grid2 container spacing={2}>
            {getRooms.map((room) => (
              <Grid2 size={{ md: 4, sm: 6, xs: 12 }} key={room._id}>
                <Link to={`/explore-rooms/${room._id}`}>
                  <Stack>
                    {room.images ? (
                      <div style={{ position: "relative" }}>
                        <img
                          style={{
                            borderRadius: "1rem",
                            width: "100%",
                            height: "200px",
                          }}
                          src={room.images[0]}
                          alt=""
                        />
                        <div
                          style={{
                            borderRadius: "1rem",

                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            right: "0",
                            left: "0",
                          }}
                        >
                          <div
                            style={{
                              right: "0",
                              position: "absolute",
                              background: "#FF498B",
                              borderTopLeftRadius: "15px",
                              borderTopRightRadius: "15px",
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                width: "180px",
                                height: "2rem",
                                paddingLeft: "10px",
                                paddingTop: "10px",
                                textAlign: "center",
                                fontSize: "1rem",
                              }}
                            >
                              ${room.price}
                            </div>
                          </div>
                          <div
                            style={{
                              left: "10%",
                              top: "60%",
                              position: "absolute",
                            }}
                          >
                            <div style={{ color: "white" }}>
                              <div
                                style={{
                                  marginBlock: "10px",
                                  fontSize: "1.5rem",
                                }}
                              >
                                {room.roomNumber}
                              </div>
                              <div style={{ fontSize: "1rem" }}>
                                {room.facilities && room.facilities.length > 0 ? (
                                  <div style={{ fontSize: "1rem" }}>
                                    {room.facilities[0].name}{" "}
                                    {/* هنا هيظهر 'xx' */}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: "1rem" }}>
                                    No facilities available
                                  </div>
                                )}{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img src={NotFound} alt="" />
                    )}
                  </Stack>
                </Link>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
        <Stack sx={{ marginBlock: "2rem", alignItems: "center" }}><Pagination count={totalPages}
          page={currentPage} variant="outlined" shape="rounded" onChange={handlePageChange} /></Stack>
      </Container>
    </>
  );
}
