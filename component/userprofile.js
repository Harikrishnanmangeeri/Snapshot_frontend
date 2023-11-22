"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardCover from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
import Usertab from "./created_saved_in profile";
import EditbannerModal from "./Editbannermodal";
import axiosInstance from "@/Redux/axios";
const cookie = getCookies("token");

export default function UserProfile() {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axiosInstance.get(
          "user/profile",
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my profile!',
        text: 'View my profile on this awesome site.',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    }
  
  };

  return (
    <>
      <Box>
        <Card
          sx={{
            minWidth: 300,
            minHeight: "70vh",
            flexGrow: 1,
            alignItems: "center",
            position: "relative",
            overflow: "hidden", 
          }}
          style={{ border: "none" }}
        >
          <CardCover
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {profile?.map((data) => (
              <img
                key={data._id}
                src={data.banner}
                alt="User Profile Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(60%)", 
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <EditbannerModal />
            </div>
          </CardCover>

          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "white", 
              padding: "40px", 
            }}
          >
            {profile?.map((data) => (
              <Box key={data._id}>
                <div style={{ position: "relative" }}>
                  <Avatar
                    alt="User Avatar"
                    src={data.avatar}
                    sx={{
                      width: 150,
                      height: 150,
                      border: "6px solid white",
                      margin: "0 auto", 
                    }}
                  />
                  <IconButton
                    onClick={() => router.push("/edit_profile")}
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      right: "8px",
                      backgroundColor: "#1976D2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#125699",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                    {data.username}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "white", marginTop: 1 }}>
                    {data.email}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 2, color: "white" }}>
                    {data.bio}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1, color: "white" }}>
                    {data.website}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "white", marginTop: 1 }}>
                    {data.contact}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 2, color: "white" }}>
                    <strong>Followers:</strong> {data.followers?.length} |{" "}
                    <strong>Following:</strong> {data.following?.length}
                  </Typography>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: 2, color: "white", borderColor: "white" }}
                    onClick={handleShareProfile}
                  >
                    <ShareIcon />
                  </Button>
                </div>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
      <Usertab />
    </>
  );
}
