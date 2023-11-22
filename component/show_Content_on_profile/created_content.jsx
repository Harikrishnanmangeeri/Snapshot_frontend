import React, { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getCookies } from "cookies-next";
import Showingsnapprofile from "./showingsnapprofile";
import axiosInstance from "@/Redux/axios";
const cookie = getCookies("token");

export default function ContentShowonUserProfile() {
const [content,setContent]=useState();

console.log(content);
useEffect(() => {
  async function content() {
    const contents = await axiosInstance.get(
      "user/showcontent",
      {
        headers: {
          Authorization: `Bearer ${cookie.token} `,
        },
      }
    );
    setContent(contents.data);
  }
  content();
}, []);

const handlesnap = () =>{

}

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={containerStyle}>
<ImageList sx={imageListStyle} variant="masonry" cols={isMobile ? 2 : 5} rowHeight="auto" gap={8}>
        {content?.map((item) => (
          
          <Showingsnapprofile item={item}/>
        ))}
      </ImageList>
    </div>
  );
}

const containerStyle = {

  overflow: 'hidden', // Hide overflow (scrollbars)
};

const imageListStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '25px'
};




// Nothing to show...yet! Pins you create will live here.