import { ImageListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Viewsnapuser from "../UserViewUserSnap";
import { useDispatch, useSelector } from 'react-redux';
import { finduser, showcomments } from '@/Redux/features/findcontentuser';

const Showingsnapprofile = ({item}) => {
    const [open, setOpen] = useState(false);
    const [img, setimg] = useState(true);
    const show = useSelector((state) => state.user.showcomment);
    const dispatch = useDispatch();
    const imageItemStyle = {
        borderRadius: '25px', // Add border radius of 25px
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow to each image
        overflow: 'hidden', // Hide overflow for images
      };

      useEffect(() => {
        if(img){
          function reload() {
          dispatch(finduser(item._id));
          dispatch(showcomments(item._id))
        setimg(false)
        }
        reload();}
      }, );
    
  return (
    <div>
          <ImageListItem key={item.url} sx={imageItemStyle}>
            <img 
            onClick={()=>{setOpen(true) 
                setimg(true)}}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=164&h=164&fit=crop&auto.format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
          <Viewsnapuser open={open} setOpen={setOpen} item={item} img={img} setimg={setimg} show={show}/>

    </div>
  )
}

export default Showingsnapprofile