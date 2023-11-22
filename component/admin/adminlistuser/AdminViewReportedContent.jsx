"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { getCookies } from "cookies-next";
import { Button, Divider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/Redux/axios"

const ReportedContent = () => {
  const [reportedItems, setReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cookie = getCookies("admin_token");

  useEffect(() => {
    async function getReportedItems() {
      try {
        const response = await axiosInstance.get(
          `admin/reports?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.admin_token}`,
            },
          }
        );
        setReportedItems(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reported items:", error);
        setLoading(false);
      }
    }

    getReportedItems();
  }, [currentPage, cookie.admin_token]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleAction = () => {
    notify();
  };
  const notify = () =>
    toast.info("This feature is under development. Stay tuned for updates!");
  const renderReportedItemCard = (item) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
      <ToastContainer />
      <Card
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={item.content_id?.user_id?.avatar}
              alt={item.Id.username}
            />
          }
          title={item.content_id?.user_id?.username}
        />
        <CardMedia
          component="img"
          height="200"
          image={item.content_id?.url}
          alt="Reported Image"
        />
        <CardContent style={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {item.content_id?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.content_id?.description}
          </Typography>
        </CardContent>
        <Divider />
        <div display="flex">
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ padding: "8px" }}
          >
            Report Details:
          </Typography>
          <CardHeader
            avatar={<Avatar src={item.Id?.avatar} alt={item.Id?.username} />}
            title={item.Id.username}
          />
          <Typography variant="body2" style={{ padding: "8px", color: "red" }}>
            <span style={{ color: "#C3C1C1 " }}>Reports:</span> {item.report}
          </Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAction()}
          style={{ margin: "8px" }}
        >
           Action
        </Button>
        <Divider />
      </Card>
    </Grid>
  );
  return (
    <Box mt={3}>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={3}>
            {reportedItems.map(renderReportedItemCard)}
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={3}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ReportedContent;
