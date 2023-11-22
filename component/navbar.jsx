"use client";
import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { deleteCookie, getCookies } from "cookies-next";
const cookie = getCookies("token");
import Avatar from "@mui/material/Avatar";
import Search from "./Search";
import axiosInstance from "@/Redux/axios";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2), // Adjust the padding as needed
    transition: theme.transitions.create("width"),
    width: "100%", // Adjust the width as needed
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [profile, setprofile] = useState();
  const [createMenuOpen, setCreateMenuOpen] = useState(null);

  // console.log(profile);
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

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
      setprofile(profiles.data);
    }
    profile();
  }, []);

  const handleCreateMenuOpen = (event) => {
    setCreateMenuOpen(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    router.push("/user_profile");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "44px" }}
    >
      <Box sx={{ width: 250, height: "60vh" }} role="presentation">
        <List>
          {profile?.map((data, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar
                  alt="User Avatar"
                  src={data.avatar}
                  sx={{ width: 50, height: 50 }}
                />
              </ListItemIcon>
              <ListItemText
                onClick={() => router.push("/user_profile")}
                primary={data.username}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/user_profile")}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box style={{width:'89px'}}>
        <Search />
      </Box>
      <Divider style={{marginTop:'8px'}}/>
      <List>
          {profile?.map((data, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar
                  alt="User Avatar"
                  src={data.avatar}
                  sx={{ width: 50, height: 50 }}
                />
              </ListItemIcon>
              <ListItemText
                onClick={() => router.push("/user_profile")}
                primary={data.username}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/user_profile")}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
    </Menu>
  );

  return (
    // <Box sx={{ flexGrow: 1 }} >
    <AppBar
      position="sticky"
      style={{ background: "white", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <Image src="/Vector.svg" alt="Photos" width="30" height="30" />

          {/* <MenuIcon /> */}
        </IconButton>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="text"
            className="btn active"
            onClick={() => router.push("/user")}
            style={{ color: "black" }}
          >
            Home
          </Button>

          <Button
            variant="text"
            className="btn active"
            onClick={() => router.push("/explore")}
            style={{ color: "black" }}
          >
            Explore
          </Button>
          <Button
            variant="text"
            className="btn active"
            onClick={handleCreateMenuOpen}
            style={{ color: "black" }}
          >
            Create
          </Button>
          <Menu
            anchorEl={createMenuOpen}
            open={Boolean(createMenuOpen)}
            onClose={() => setCreateMenuOpen(null)}
            sx={{ width: 250, height: "60vh" }}
            role="presentation"
          >
            <MenuItem onClick={() => router.push("/create_idea_snap")}>
              Create Idea Snap
            </MenuItem>
            <MenuItem onClick={() => router.push("/create_snap")}>
              Create Snap
            </MenuItem>
          </Menu>
        </Stack>

        <Box sx={{ flexGrow: 1 }} style={{ color: "black" }} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          style={{ color: "black" }}
        >
          <Stack>
            <Search />
          </Stack>
          {profile?.map((data, index) => (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              key={index}
            >
              <Avatar
                alt="User Avatar"
                src={data.avatar}
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>

    // </Box>
  );
}
