"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { getCookies } from "cookies-next";
import axiosInstance from "@/Redux/axios";

const AdminViewSnap = () => {
  const [reportedItems, setReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cookie = getCookies("admin_token");

  useEffect(() => {
    async function getReportedItems() {
      try {
        const response = await axiosInstance.get(
          `admin/viewSnap?page=${currentPage}`,
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
        <>
          <Grid container spacing={3}>
            {reportedItems.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Card elevation={3} style={{ maxWidth: "400px" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.user_id.avatar}
                        alt={item.user_id.username}
                      />
                    }
                    title={item.user_id.username}
                    subheader={new Date(item.created_at).toLocaleDateString()}
                  />
                  <Divider />
                  {item.url && (
                    <img
                      src={item.url}
                      alt="Reported Snapshot"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ marginBottom: "16px" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
        </>
      )}
    </Box>
  );
};

export default AdminViewSnap;
