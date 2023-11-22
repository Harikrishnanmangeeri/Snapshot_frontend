"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  addComment,
  finduser,
  setlike,
  showAnotherUser,
} from "@/Redux/features/findcontentuser";
// import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
import { Tooltip } from "@mui/material";
import axiosInstance from "@/Redux/axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Viewsnapuser({
  open,
  setOpen,
  item,
  setimg,
  show,
  img,
}) {
  const [profile, setprofile] = useState();
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const cookie = getCookies("token");
  // console.log(item);
  const dispatch = useDispatch();

  useEffect(() => {
    async function profile() {
      const profiles = await axiosInstance.get(
        "user/profile",
        {
          headers: {
            Authorization: `Bearer ${cookie.token} `,
          },
        }
      );
      setprofile(profiles.data[0]);
    }
    profile();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setimg(true);
  };

  useEffect(() => {
    if (img) {
      function reload() {
        dispatch(finduser(item._id));
        setimg(false);
      }
      reload();
    }
  });

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      dispatch(addComment({ comment, id: item._id, user_id: profile._id }));
      setComment("");
    }
  };
  const handleShowuser = (cid) => {
    const id = { userid: item.user_id?._id, commentuser: cid };
    // console.log(id);
    dispatch(showAnotherUser(id));
    // router.push(`/View_Users_profile/${ cid||content.user_id._id }`)
  };
  const handleLike = async () => {
    dispatch(setlike({ id: item._id, user_id: profile._id }));
    setTimeout(() => dispatch(finduser(item._id)), 50);
    setimg(true);
  };

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handledelete = async (id) => {
    try {
      await axiosInstance.delete(`user/content/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      setSnackbarMessage("Delete successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      location.reload();
    } catch (error) {
      console.log("deleting unsucessfully", error.message);
      setSnackbarMessage("Delete unsuccessful");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="stretch"
            style={{
              background: "#f5f5f5",
              borderRadius: "20px",
              padding: "20px",
              marginTop: "50px",
            }}
          >
            {/* Left Section */}
            <Box
              flex="1"
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.url}
                  alt="Uploaded Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "560px",
                    objectFit: "contain",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "20px",
                    border: "none",
                  }}
                />
              </div>
            </Box>

            {/* Right Section */}
            <Box flex="1" style={{ marginLeft: "10px" }}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <div></div>

                <div>
                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Stack>

              <div
                style={{
                  padding: "20px",
                  background: "#f5f5f5",
                  borderRadius: "20px",
                  marginTop: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={handleLike}
                      style={{ marginRight: "10px" }}
                    >
                      {item.likes?.includes(profile?._id) ? (
                        <FavoriteOutlinedIcon style={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          style={{ color: "black" }}
                        />
                      )}
                    </IconButton>
                    <Typography variant="body2">
                      {item?.likes?.length}
                    </Typography>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "35px",
                          marginLeft: "21px",
                          width: "20%",
                          margin: "0 auto",
                        }}
                      >
                        Save
                      </Button> */}
                    </div>
                    <div>
                      <Tooltip title="Delete snap" arrow>
                        <IconButton onClick={() => handledelete(item._id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h5"
                    style={{
                      marginBottom: "10px",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" style={{ lineHeight: "1.5" }}>
                    {item.description}
                  </Typography>
                </div>
              </div>

              <div>
                <div
                  style={{
                    height: "200px",
                    overflowY: "auto",
                    padding: "20px",
                    background: "#f5f5f5",
                    borderRadius: "20px",
                    marginTop: "20px",
                  }}
                >
                  {show.map((comment) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Avatar
                        src={comment.user_id.avatar}
                        alt={comment.user_id.username}
                        style={{ marginRight: "10px" }}
                        onClick={() => handleShowuser(comment.user_id?._id)}
                      />
                      <div>
                        <p>{comment.comments}</p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={profile?.avatar}
                    alt="Current User"
                    style={{ marginRight: "10px" }}
                  />
                  <TextField
                    label="Add a comment"
                    fullWidth
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddComment}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "35px",
                      margin: "10px",
                      padding: "12px",
                    }}
                  >
                    <SendSharpIcon />
                  </Button>
                </div>
              </div>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px",
            }}
          ></IconButton>
        </Container>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
