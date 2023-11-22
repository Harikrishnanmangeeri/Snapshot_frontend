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
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  my: 4, 
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function Loginmodal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter()

  const loginhandle = async (event)=>{
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    // console.log(email,password);
    try {
      const response = await axiosInstance.post('user/login', {
        password: password,
        email: email,
      });

      if (response.data.status === 'sucess' && response.data.isBlocked === false) {
        setCookie('token', response.data.token);
        router.push('/user');
        toast.success('Login successful!');
      } else if (response.data.status === 'admin') {
        setCookie('admin_token', response.data.token);
        router.push('/Admin_Dash');
        toast.success('Admin login successful!');
      } else if (response.data.isBlocked === true) {
        toast.error('You are blocked!');
      } else {
        toast.error('Incorrect password!');
      }
    } catch (error) {
      toast.error('An error occurred.');
    }

    event.target.reset();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" style={{ color: 'white', background: 'red', borderRadius: '20px' }}>
        Login
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
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={loginhandle} method='post' >
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
                autoComplete="current-password"
                InputProps={{
                  style: {
                    borderRadius: '25px',
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" style={{ background: 'red', color: 'white', borderRadius: '25px' }} sx={{ mt: 3, mb: 2 }}>
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer position="top-right" autoClose={5000} />
        </Box>
       
      </Modal>
    </div>
  );
}
