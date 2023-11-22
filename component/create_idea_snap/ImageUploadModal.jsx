'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Snackbar, Alert } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getCookies } from 'cookies-next';
import ContentUpload from './Upload_content_cloudnary';
import {content} from '@/Redux/features/content';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/Redux/axios';
const cookie = getCookies("token");



const ImageUploadModal = ({ isOpen, onClose, onImageUpload, uploadedImage }) => {
  const [selectedImage, setSelectedImage] = useState(uploadedImage);
  const [draft,setDraft]=useState(null)
  const [isAlertOpen, setAlertOpen] = useState(false);
//  console.log(draft);
 const dispatch = useDispatch()
 const router = useRouter();


 const handleupload = async () => {
  if (!draft) { 
    setAlertOpen(true); 
  } else {
    try {
      const url = await ContentUpload(draft);
      await axiosInstance.post(
        "user/draft",
        {
          draft: url,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );
      router.push("/publish_idea_snap");
      dispatch(content(url));
    } catch (error) {
      console.log("from upload", error.message);
    }
  }
};


  const handleImageUpload = (file) => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setDraft(file)
    }
    // console.log(file);
  };
 




  const handlesubmit =async (e)=>{
    e.preventDefault()
  
    e.target.reset()
    }


  
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" onSubmit={handlesubmit}>
      <DialogTitle align='center'>Upload Idea Snap</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: "700px",
                minHeight: "200px",
             
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Image"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <IconButton component="label" color="secondary">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                <AddPhotoAlternateIcon fontSize="large" style={{ color: 'grey' }} />
              </IconButton>
            )}
          </div>
        </div>
      </DialogContent>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{
          background: "red",
          color: "white",
          borderRadius: "25px",
        }}
        
        sx={{ mt: 3, mb: 2 }}
        onClick={()=>handleupload()}
        // onClick={() => router.push("/publish_idea_snap")}
      >
        Open<ChevronRightIcon/>
      </Button>

      <Snackbar
        open={isAlertOpen}
        autoHideDuration={2500} 
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
       <Alert onClose={() => setAlertOpen(false)} variant="filled" severity="warning">
       "No image selected. To proceed, choose an image for upload."
</Alert>

      </Snackbar>
    </Dialog>
  );
};

export default ImageUploadModal;
