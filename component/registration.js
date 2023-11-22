'use client'
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import axiosInstance from '@/Redux/axios';




const backgroundStyle = {
  backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#ffff', // Set a static color here
};

export default function Registration() {

  const register = async (event)=>{
    event.preventDefault()
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value
    // const confirmPassword = event.target.confirmPassword.value
    try {
      await axiosInstance.post('user/register',{
        username:username,
         password:password,
          email:email,
      })
    } catch (error) {
      
    }
  event.target.reset()
 
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid 
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
    ...backgroundStyle,
    borderRadius: '9px'
  }}
      />
      <Grid 
  item
  xs={12}
  sm={8}
  md={5}
  component={Paper}
  elevation={6}
  square
  sx={{ borderRadius: '9px' }}
>
  <Box
    sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    }}
  >
    <Image src='/Vector.svg' alt='Photos' width="70" height="30" />
    <Typography component="h2" variant="h4">
      Welcome to Snapshot
    </Typography>
    <Typography component="h5" variant="h6">
      Find new ideas to try
    </Typography>
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={register}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        InputProps={{
          style: {
            borderRadius: '9px',
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        InputProps={{
          style: {
            borderRadius: '9px',
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        InputProps={{
          style: {
            borderRadius: '9px',
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        InputProps={{
          style: {
            borderRadius: '9px',
          },
        }}
      />
      <FormControlLabel
        control={<Checkbox value="agreement" color="primary" />}
        label="I agree to the terms and conditions"
      />
      <Button type="submit" fullWidth variant="contained" style={{ background: 'Red', color: 'white', borderRadius: '9px' }} sx={{ mt: 3, mb: 2 }}>
        Continue 
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Already have an account? Log In
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Grid>

    </Grid>
  );
}
