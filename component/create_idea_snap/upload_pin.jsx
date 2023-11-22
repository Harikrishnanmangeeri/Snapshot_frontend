'use client'
import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import ImageUploadModal from './ImageUploadModal';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const Publish_idea_snap = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

const open = useSelector(state=>state.content.user)
console.log(open);

  const handleImageUpload = (file) => {
    if (file) {
      setUploadedImage(file);
      setModalOpen(false);
    }
  };

  const handlePost = () => {
    // Handle the post action here
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
  };
  
  const images =[
    {
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?palakkad"
    },
    {
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?munnar"
    },{
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?india"
    },{
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?wayanad"
    },{
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?alappuzha"
    },
    {
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?kerala"
    },
    {
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?malappuram"
    },
    {
      name: "Health and Wellness",
      image:"https://source.unsplash.com/400x300/?varanasi"
    },
  ]


  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container style={{ maxWidth: open ? '58%' : '80%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align='center'>
            Create idea snap
          </Typography>
          <Typography variant="body1" align='center'>
            Share your inspiration with the world!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setModalOpen(true)}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Upload Image
          </Button>
        </Grid>

        <Grid item xs={12}>
          {/* Attractive Quote */}
          <Typography variant="body1" gutterBottom align='center'>
            "Your inspiration is someone's future."
          </Typography>
        </Grid>
     

      </Grid>
      <ImageList  cols={isMobile ? 2 : 4} gap={8}>
          {images.map((images, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${images.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${images.image}?w=248&fit=crop&auto=format`}
                alt={images.name}
                loading="lazy"
                style={{ ...commonStyles, borderRadius: '16px' }}
              />
            </ImageListItem>
        ))}
      </ImageList>
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        onPost={handlePost}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default Publish_idea_snap;
