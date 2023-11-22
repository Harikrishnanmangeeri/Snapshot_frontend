'use client'
import React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';

import Typewriter from 'typewriter-effect';

export default function LandingCover() {
  return (
    <Box>
      <Card sx={{ minWidth: 300, minHeight: "80vh", flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
          >
            <source
              src="/mainvid.mp4"
              type="video/mp4"
            />
          </video>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '3rem',
              fontFamily: 'Plush Complete Family, sans-serif',
            }}
          >
            <Typewriter
              options={{
                strings: ['Welcome to Snapshot', 'Discover, Create, Share', 'Unleash Your Inspiration', 'Join the Visual Revolution'],
                autoStart: true,
                loop: true,
              }}
             
            />
          </div>
        </CardCover>
        <CardContent>
        </CardContent>
      </Card>
    </Box>
  );
}
