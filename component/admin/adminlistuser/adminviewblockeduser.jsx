"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { getCookies } from "cookies-next";
import { useRouter } from "next/navigation";
import axiosInstance from "@/Redux/axios";

const cookie = getCookies("admin_token");
const BlockedUserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  useEffect(() => {
    async function getUserList() {
      try {
        const response = await axiosInstance.get(
          `admin/viewblockuser?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.admin_token}`,
            },
          }
        );
        setUsers(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user list:", error);
        setLoading(false);
      }
    }

    getUserList();
  }, [currentPage]);

  const blockUnblock = async (id) => {
    try {
      await axiosInstance.post(
        "admin/blockuser",
        {
          user_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.admin_token}`,
          },
        }
      );
      location.reload();
      getUserList();
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const renderUserCard = (user, index) => (
    <Grid item key={user._id} xs={12} sm={6} md={4} lg={4}>
      <Card>
        <CardContent>
          <Avatar alt={user.username} src={user.avatar} />
          <Typography variant="h6">{user.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.bio}
          </Typography>
          <Button
            variant="contained"
            color={user.isBlocked ? "secondary" : "primary"}
            onClick={() => blockUnblock(user._id)}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
  return (
    <Box
      mt={3}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid container spacing={2}>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80vh"
            width="100%"
          >
              <CircularProgress />
          </Box>
        ) : users?.length > 0 ? (
          // Render the first 9 users or less
          users.slice(0, 9).map(renderUserCard)
        ) : (
          <Typography variant="body2" color="textSecondary">
            No blocked users found !.
          </Typography>
        )}
      </Grid>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          // variant="outlined"
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </Box>
  );
};

export default BlockedUserListComponent;
