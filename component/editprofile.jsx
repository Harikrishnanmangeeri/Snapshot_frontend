"use client";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useState } from "react";
import upload from "./uploads";
import { useRouter } from "next/navigation";
import UpdateProfile from "./updateprofile";
import { getCookies } from "cookies-next";
import axiosInstance from "@/Redux/axios";
const cookie = getCookies("token");

export default function Editprofile() {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

  const handleUpload = async () => {
    try {
      const url = await upload(avatar);
      await axiosInstance.put(
        "user/Editavatar",
        {
          avatar: url,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error from upload", error.message);
    }
  };

  const uploadAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add any additional logic for form submission if needed
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.9))",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        container
        sx={{
          borderRadius: "9px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ marginBottom: 2 ,display: "flex", flexDirection: "column", alignItems: "center" }}>
              Avatar
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <TextField
                margin="normal"
                fullWidth
                name="Name"
                onChange={(e) => uploadAvatar(e)}
                type="file"
                id="image"
                InputProps={{
                  style: {
                    borderRadius: "9px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  color: "white",
                  borderRadius: "9px",
                  backgroundColor: "#1976D2",
                  "&:hover": {
                    backgroundColor: "#125699",
                  },
                }}
                onClick={handleUpload}
              >
                Change Avatar
              </Button>
            </Box>
          </Box>
          <UpdateProfile />
        </Box>
      </Grid>
    </Grid>
  );
}
