
"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Box } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector, useDispatch } from "react-redux";
import { follow, showAnotherUser } from "@/Redux/features/findcontentuser";
import { getCookies } from "cookies-next";
import axiosInstance from "@/Redux/axios";

const cookie = getCookies("token");

const ShowUserProfile = ({ userprofile }) => {
  const [profileData, setProfileData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAnotherUser(userprofile))

  }, [dispatch]);

  const Profile = useSelector((state) => state.user.showuser);

  useEffect(() => {
    async function fetchProfile() {
      const profiles = await axiosInstance.get(
        "user/profile",
        {
          headers: {
            Authorization: `Bearer ${cookie.token} `,
          },
        }
      );
      setProfileData(profiles.data[0]);
    }
    fetchProfile();
  }, []);

  const handleFollowUnfollow = () => {
    dispatch(follow({ user_id: profileData._id, id: Profile?._id }));
  };

  const handleShareProfile = () => {
    // Add your share logic here
    // For example, you can use the Web Share API
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
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover", 
            }}
            alt="User Profile Cover"
            src={Profile?.banner ||  "https://source.unsplash.com/400x300/?nature,green"}
          />

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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ position: "relative" }}>
                  <Avatar
                    alt="User Avatar"
                    src={Profile?.avatar}
                    sx={{
                      width: 150,
                      height: 150,
                      border: "6px solid white",
                      margin: "0 auto",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                  {Profile?.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ color: "white", marginTop: 1 }}>
                  {Profile?.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginTop: 2, color: "white" }}>
                  {Profile?.bio}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ marginTop: 1, color: "white" }}>
                  {Profile?.website}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ color: "white", marginTop: 1 }}>
                  {Profile?.contact}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ marginTop: 2, color: "white" }}>
                  <strong>Followers:</strong> {Profile?.followers?.length} |{" "}
                  <strong>Following:</strong> {Profile?.following?.length}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{ marginRight: 2, color: "white", borderColor: "white" }}
                  onClick={handleShareProfile}
                >
                  <ShareIcon />
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: "20px" }}
                  onClick={() => handleFollowUnfollow()}
                >
                  {Profile?.followers?.includes(profileData?._id) ? (
                    <Typography>Following</Typography>
                  ) : (
                    <Typography>Follow</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" style={{ color: "blue" }}>
          Exciting News!
        </Typography>
        <Typography variant="body1" style={{ fontSize: "18px", fontWeight: "bold", color: "#333", padding: "10px" }}>
          More amazing features are in the works! 🚀 Stay tuned for updates and enjoy your experience!
        </Typography>
      </div>
    </>
  );
};

export default ShowUserProfile;
