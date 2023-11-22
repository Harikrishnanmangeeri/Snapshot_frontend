"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
import axiosInstance from "@/Redux/axios";


const Create_idea_snap = ({ sidebarOpen }) => {
  const [data, setData] = useState({});
  console.log(data);
  const [imgcat, setImagcat] = useState("");
  const user = useSelector((state) => state.content.user);
  const router = useRouter();
  const categories = [
    "Nature",
    "Travel",
    "Food",
    "Fashion",
    "Home Decor",
    "Art",
    "Technology",
    "Sports",
    "Pets",
    "Fitness",
    "Music",
    "Books",
    "Photography",
    "Science",
    "Gardening",
    "Movies",
    "History",
    "Cooking",
    "Travel",
    "Nature",
    "Fashion",
    "DIY Projects",
    "Travel Destinations",
    "Technology Gadgets",
    "Wildlife",
    "Education",
    "Health and Wellness",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = imgcat;

    try {
      const cookie = getCookies("token");
      if (cookie.token) {
        await axiosInstance.post(
          "user/postcontent",
          {
            url: user,
            title: title,
            description: description,
            category: category[0],
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        );

        router.push("/user");
        console.log("success");
      } else {
        console.error("Token is missing in cookies.");
      }
    } catch (error) {
      console.log("axios", error);
    }
  };

  // const handleupload = async () => {

  // };

  return (
    <Container maxWidth={sidebarOpen ? "lg" : null}>
      <Paper
        elevation={0}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          background: "#f5f5f5", // Background color
        }}
      >
        <div style={{ padding: "20px" }}>
          <Typography variant="h4" style={{ fontSize: "24px" }}>
            Create Idea Snap
          </Typography>
        </div>
        <div></div>
        <div style={{ flex: 1, textAlign: "right", padding: "20px" }}>
          <Typography>Changes stored!</Typography>
        </div>
      </Paper>
      <Divider style={{ background: "#e0e0e0" }} /> {/* Divider color */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Image Card */}
          <Card elevation={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  style={{
                    padding: "0",
                    // background: "#f5f5f5", // Background color
                    borderRadius: "16px", // Rounded corners
                    // boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Drop shadow
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "13%",
                  }}
                >
                  <div>
                    <img
                      src={user}
                      alt="Uploaded Image"
                      style={{
                        width: "100%",
                        height: "430px", // Set a specific height to crop the image
                        borderRadius: "16px", // Rounded corners for the image
                        objectFit: "cover", // Crop image to fit container
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle image shadow
                      }}
                    />
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} style={{ marginTop: "5%" }}>
                <CardContent>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    // elevation={0}
                    style={{
                      borderRadius: "25px",
                      padding: "50px",
                      background: "#f5f5f5",
                    }}
                  >
                    <TextField
                      label="Title"
                      id="title"
                      fullWidth
                      variant="outlined"
                      style={{ margin: "12px 0" }}
                    />
                    <TextField
                      label="Description"
                      multiline
                      id="description"
                      rows={4}
                      fullWidth
                      variant="outlined"
                      style={{ margin: "12px 0" }}
                    />
                    <Autocomplete
                      multiple
                      id="nature-categories"
                      // name ='categories'
                      options={categories}
                      // defaultValue={["Nature"]}
                      getOptionLabel={(option) => option}
                      onChange={(e, value) => setImagcat(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Categories"
                          id="cat"
                          name="cat"
                          placeholder="Favorites"
                        />
                      )}
                    />
                    <Button
                      variant="contained"
                      // onClick={()=>handleupload()}

                      color="primary"
                      type="submit"
                      fullWidth
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "35px",
                        marginTop: "10px",
                      }}
                    >
                      Publish
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "50%",
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "25px",
          }}
        >
          <InfoIcon color="primary" style={{ marginRight: "8px" }} />
          <Typography variant="body2" color="textSecondary">
            More uploading features will be unlocked soon.
          </Typography>
        </div>
      </Grid>
    </Container>
  );
};

export default Create_idea_snap;
