"use client";

import React, { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import {
  Box,
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  Avatar,
  CssBaseline,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/Redux/axios";

const cookie = getCookies("token");

export default function UpdateProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axiosInstance.get("user/profile", {
          headers: {
            Authorization: `Bearer ${cookie.token} `,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bio = e.target.bio.value;
    const username = e.target.username.value;
    const website = e.target.website.value;
    const contact = e.target.contact.value;

    try {
      if (cookie.token) {
        await axiosInstance.put(
          "user/Editprofile",
          {
            bio: bio,
            website: website,
            contact: contact,
            username: username,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.token} `,
            },
          }
        );

        router.push("/user_profile");
      } else {
        console.error("Token is missing in cookies.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    e.target.reset();
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={5} sx={{ borderRadius: "9px", marginTop: "30px" }}>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Update Profile
            </Typography>
            {profile.map((data) => (
              <form key={data._id} noValidate onSubmit={handleSubmit}>
                <Avatar
                  src={data.avatar}
                  alt="Profile Picture"
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "0 auto 1rem",
                  }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  defaultValue={data.bio}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  defaultValue={data.username}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  defaultValue={data.website}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  defaultValue={data.contact}
                  variant="outlined"
                  sx={{ mb: 2 }} 
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    background: "Red",
                    color: "white",
                    borderRadius: "9px",
                    marginTop: "10px",
                  }}
                  sx={{ mb: 2 }}
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    background: "Red",
                    color: "white",
                    borderRadius: "9px",
                    marginTop: "10px",
                  }}
                  onClick={() => router.push("/user_profile")}
                  sx={{ mb: 2 }}
                >
                 back to profile
                </Button>
              </form>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
