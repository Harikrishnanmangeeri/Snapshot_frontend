import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import axiosInstance from '@/Redux/axios';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
};

const contentStyle = {
  my: 2,
  mx: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function RegistrationModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const register = async (event)=>{
    // event.preventDefault()
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
  handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" style={{ color: 'black', background: '#dbd7d7', borderRadius: '27px'}}>
       Sign up
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '10px',
              zIndex: 1,
              color: 'black',
            }}
          >
            <CloseIcon />
          </Button>
          <Box sx={contentStyle}>
          <Image src="/Vector.svg" alt="Photos" width="70" height="30" />
            <Typography component="h2" variant="h5">
              Welcome to Snapshot
            </Typography>
            <Typography component="h5" variant="h6">
              Find new ideas to try
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={register} method='post'>
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
                    borderRadius: '25px',
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
                    borderRadius: '25px',
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
                    borderRadius: '25px',
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
                    borderRadius: '25px',
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="agreement" color="primary" />}
                label="I agree to the terms and conditions"
              />
              <Button type="submit" fullWidth variant="contained" style={{ background: 'Red', color: 'white', borderRadius: '25px' }} sx={{ mt: 3, mb: 2 }}>
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
        </Box>
      </Modal>
    </div>
  );
}
