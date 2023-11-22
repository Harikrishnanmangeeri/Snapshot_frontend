"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
import {
  addComment,
  finduser,
  follow,
  setlike,
  showAnotherUser,
  showcomments,
} from "@/Redux/features/findcontentuser";
import Reportcontent from "./Report";
import axiosInstance from "@/Redux/axios";

const cookie = getCookies("token");

const Show_snap = ({ url }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [profile, setprofile] = useState();
  const content = useSelector((state) => state.user.content);
  const show = useSelector((state) => state.user.showcomment);

  useEffect(() => {
    function reload() {
      dispatch(finduser(url));
      dispatch(showcomments(url));
    }
    reload();
  }, [dispatch]);

  const likes = useSelector((state) => state.user.like);

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
  }, [dispatch]);

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      dispatch(addComment({ comment, id: content._id, user_id: profile._id }));
      setComment("");
    }
    setTimeout(() => dispatch(showcomments(url)), 50);
  };

  const handleLike = async () => {
    dispatch(setlike({ id: content._id, user_id: profile._id }));
    setTimeout(() => dispatch(finduser(url)), 50);
  };

  const handlefollow_unfollow = () => {
    dispatch(follow({ user_id: profile._id, id: content.user_id._id }));
    setTimeout(() => dispatch(finduser(url)), 50);
  };

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleShowuser = (cid) => {
    const id = {
      userid: content.user_id?._id,
      commentuser: cid,
    };
    console.log(id);
    dispatch(showAnotherUser(id));
    router.push(`/View_Users_profile/${cid || content.user_id._id}`);
  };

  const handleSave = async (id) => {
    try {
      await axiosInstance.post(
        "user/SaveContent",
        {
          user_id: profile._id,
          content_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      toast.success("🎉 Snap saved successfully!");
    } catch (error) {
      console.error("error occure in saving snap:", error);
      toast.error(
        "Error occurred while saving snap. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        style={{
          background: "#f5f5f5",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        {/* Image Section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={content.url}
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

        {/* Top Section */}
        <Box marginTop="20px">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              background: "#f5f5f5",
              borderRadius: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={content.user_id?.avatar}
                alt={content.user_id?.username}
                style={{ marginRight: "10px" }}
                onClick={() => handleShowuser()}
              />
              <div>
                <Typography variant="subtitle1" onClick={() => handleShowuser(content?._id)}>
                  {content.user_id?.username}
                </Typography>
                <Typography variant="body2">
                  followers: {content.user_id?.followers?.length}
                </Typography>
              </div>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#EAEAEA",
                color: "black",
                borderRadius: "35px",
                border: "none",
              }}
              onClick={() => handlefollow_unfollow()}
            >
              {content.user_id?.followers.includes(profile?._id) ? (
                <Typography>following</Typography>
              ) : (
                <Typography>follow</Typography>
              )}
            </Button>
          </div>
        </Box>

        {/* Middle Section */}
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
                {content?.likes?.includes(profile?._id) ? (
                  <FavoriteOutlinedIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon style={{ color: "black" }} />
                )}
              </IconButton>
              <Typography variant="body2">
                {content?.likes?.length}
              </Typography>
            </div>
            <div style={{ display: 'flex'}}>
              <div>
                <Button
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
                  onClick={() => handleSave(content._id)}
                >
                  Save
                </Button>
              </div>
              <div><Reportcontent/></div>
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
              {content.title}
            </Typography>
            <Typography variant="body1" style={{ lineHeight: "1.5" }}>
              {content.description}
            </Typography>
          </div>
        </div>

        {/* Comments Section */}
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
            {show?.map((comment) => (
              <div
                key={comment.id}
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
                    style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.5)" }}
                  >
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Section */}
          <div style={{ display: "flex", alignItems: "center", marginTop: '20px' }}>
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
    </Container>
  );
};

export default Show_snap;
