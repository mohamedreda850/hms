import { Container, Grid2, Stack, Typography } from "@mui/material";
import NotFound from "../../../../assets/images/notFound1.png";
import {
  ADS_API,
  axiosInstanceUser,
} from "../../../../Services/END_POINTS/USER/URLS";
import { useEffect, useState } from "react";

type Room = {
  roomNumber: number;
  facilities: string;
  _id: number;
  images: string;
  price:string;
};

type Item = {
  room: Room;
};

export default function Section5() {
  const [asd, setAds] = useState<Item[]>([]);

  useEffect(() => {
    const getAds = async () => {
      const res = await axiosInstanceUser.get<Room>(ADS_API.GET_ALL_ADS);
      console.log(res.data.data.ads);
      setAds(res.data.data.ads);
    };
    getAds();
  }, []);

  return (
    <>
      <Container maxWidth="lg" className="sec5">
        <Stack sx={{ marginBlock: "20px" }}>
          <Typography sx={{ fontSize: "2rem", color: "#152C5B" }}>
            Ads
          </Typography>
        </Stack>
        <Grid2 container spacing={2}>
          {asd.slice(-4).map((item) => (
            <Grid2 size={{ md: 3, sm: 6, xs: 12 }} key={item.room._id}>
              <Stack>
                {item.room.images ? (
                  <div style={{ position: "relative" }}>
                    <img
                      style={{
                        borderRadius: "1rem",
                        height: "200px",
                        width: "100%",
                      }}
                      src={item.room.images[0]}
                      alt=""
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        top: "0",
                        borderRadius: "1rem",
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
                          ${item.room.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={NotFound} alt="" />
                )}
              </Stack>
              <Typography sx={{ paddingLeft: "3px", paddingBlock: "10px" }}>
                {item.room.roomNumber}
              </Typography>
              <Typography sx={{ paddingLeft: "3px" }}>
                {item.room.facilities[0]}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
}
