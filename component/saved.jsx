import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { getCookies } from 'cookies-next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '@/Redux/axios';


export default function SavedContent() {
  const [content, setContent] = React.useState([]);
  // console.log(content.data);
  const cookie = getCookies("token");

  React.useEffect(() => {
    async function fetchSavedContent() {
      try {
        const response = await axiosInstance.get(
          "user/savedSnap",
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        );
        setContent(response.data);

      } catch (error) {
        console.error("Error fetching saved content:", error);
      }
    }

    fetchSavedContent();
  }, [cookie.token]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box >
        <ImageList variant="masonry" cols={isMobile ? 2 : 5} gap={8}>
          {content.data?.map((item) => (
            <ImageListItem key={item._id}>
              <img
                srcSet={`${item.content_id?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.content_id?.url}?w=248&fit=crop&auto=format`}
                alt={item.content_id?.title}
                loading="lazy"
                style={{borderRadius:'35px'}}
              />
              <ImageListItemBar position="below" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
