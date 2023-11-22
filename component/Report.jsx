"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import IconButton from "@mui/material/IconButton";
import { FormControl, RadioGroup, FormControlLabel, Radio, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { reportcontent } from "@/Redux/features/findcontentuser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "@/Redux/axios";
const cookie = getCookies("token");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Reportcontent() {
  const [open, setOpen] = useState(false);
  const [reportOption, setReportOption] = useState(""); 
  const [profile, setprofile] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const content = useSelector((state) => state.user);

  useEffect(() => {
    async function profile() {
      const profiles = await axiosInstance.get(
        "user/profile",
        {
          headers: {
            Authorization: `Bearer ${cookie.token} `,
          },
        }
      );
      setprofile(profiles.data[0]);
    }
    profile();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReportOptionChange = (event) => {
    setReportOption(event.target.value);
  };

  const handleReport = () => {
    const id = { reported_user_id: profile._id, content_id: content.content._id, reports: reportOption };
    dispatch(reportcontent(id));
    handleClose();
    notify();
  };

  const notify = () => toast.success("Report submitted successfully!");

  return (
    <div>
      <ToastContainer />
      <Tooltip title="Report" arrow>
        <IconButton onClick={handleOpen} sx={{ border: "1px double white" }}>
          <ReportOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: "#fffff", borderRadius: "25px" }}>
          <Typography component="h5" variant="h6" align="center">
            Report content
          </Typography>
          <FormControl component="form" sx={{ textAlign: 'center' }}>
            <RadioGroup value={reportOption} onChange={handleReportOptionChange}>
              <FormControlLabel value="inappropriate_content" control={<Radio />} label="Inappropriate Content" />
              <FormControlLabel value="spam" control={<Radio />} label="Spam" />
              <FormControlLabel value="harassment" control={<Radio />} label="Harassment" />
              <FormControlLabel value="misinformation" control={<Radio />} label="Misinformation" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 2 }}>
              <Button onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
              
                style={{
                  background: "red",
                  color: "white",
                  borderRadius: "25px",
                  mt: 2,
                }}
              >
                Report
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
