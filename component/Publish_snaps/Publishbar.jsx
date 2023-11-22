'use client'
import React, { useState ,useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Create_idea_snap from '../Publish_snaps/ideaSnap';
import { getCookies } from "cookies-next";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {content} from '@/Redux/features/content';
import ImageUploadModal from '../create_idea_snap/ImageUploadModal';
import axiosInstance from '@/Redux/axios';


const cookie = getCookies("token");

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  marginTop:'65px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    marginTop:'65px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function PublishBar() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [draft,setDraft]=useState();
  const dispatch = useDispatch()
  useEffect(() => {
    async function draft() {
      const drafts = await axiosInstance.get(
        "user/profile",
        {
          headers: {
            Authorization: `Bearer ${cookie.token} `,
          },
        }
      );
      setDraft(drafts.data);
      // console.log(drafts);
    }
    draft();
  }, []);

  const removeImage= async(file)=>{
    try {
    
     await axiosInstance.put(
      "user/draft",
      {
        deletedraft: file,
      },
      {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      }
     )
     handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }


  const Handleupload = (file) =>{
    router.push("/publish_idea_snap")
    dispatch(content(file))
  }

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

const router =useRouter()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} >
      {draft?.map((data, dataIndex) => (
        <DrawerHeader key={dataIndex}>
        
        {open && (
  <Typography variant="h5" component="h2">
    Snap drafts ({data.draftContent.length})
  </Typography>
)}


        
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
  {open ? <KeyboardDoubleArrowLeftIcon style={{color:'black'}} />: <KeyboardDoubleArrowRightIcon style={{color:'black'}} />}
</IconButton>


        </DrawerHeader>
        ))}
        {open ? <Button
        type="submit"
        fullWidth
        onClick={() => setModalOpen(true)}
        variant="contained"
        style={{
          background: "red",
          color: "white",
          borderRadius: "25px",
        }}
        sx={{ mt: 3, mb: 2 }}
      >
        Create New 
      </Button>
        :
        <List>
      
            <ListItem disablePadding sx={{ display: 'block'}}>
              <ListItemButton
               onClick={() => setModalOpen(true)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddIcon style={{color:'black'}}/>
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
       
        </List>
    }
        <Divider />
        <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={1} rowHeight="auto" style={{ cursor: 'pointer' }}>
  {draft?.map((data, dataIndex) => (
    <Stack key={dataIndex} spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
      {data.draftContent.map((imageUrl, imageIndex) => (
        <ImageListItem key={imageIndex}>
          <img src={imageUrl} alt={`Draft Image ${imageIndex}`} onClick={() => Handleupload(imageUrl)} loading="lazy" />
          <IconButton
            onClick={() => removeImage(imageUrl)} 
            color="secondary"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              visibility: open ? 'visible' : 'hidden' 
            }}
          >
            <DeleteIcon style={{color:'#4e484b'}} />
          </IconButton>
        </ImageListItem>
      ))}
    </Stack>
  ))}
</ImageList>


      </Drawer>
      <Create_idea_snap sidebarOpen={open} />
      <ImageUploadModal
          isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onImageUpload={handleImageUpload}
        uploadedImage={uploadedImage}
        onPost={handlePost}
        onCancel={handleCancel}
      />
    </Box>
  );
}
