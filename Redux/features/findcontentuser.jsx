import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from "cookies-next";
import axiosInstance from '../axios';

const initialState = {
  loading: false,
  content: [],
  error: null,
  like:'' ,
  follow:'',
  comment:'',
  showcomment:[],
  showuser:'',
  report:''
};

const cookie = getCookie('token');

export const finduser = createAsyncThunk('user/finduser', async (id) => {
  // try {
    const res = await axiosInstance.post('user/contentUser',{
      id:id


    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  
});


export const setlike = createAsyncThunk('user/setlike', async ({id,user_id}) => {
  // console.log(user_id);
  // try {
    const res = await axiosInstance.post('user/setLike',{
      id:id,
      user_id:user_id

    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  // } catch (error) {
  //   console.error('Error fetching user:', error);
  //   throw error;
  // }
});


export const follow = createAsyncThunk('user/follow', async ({id,user_id}) => {
  // console.log(user_id,id);
  // try {
    const res = await axiosInstance.post('user/follow',{
      
    //id == follow ,, user_id == currentuser
    follow_user:id,
    user_id:user_id

    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  
});
export const addComment = createAsyncThunk('user/addComments', async ({id,user_id,comment}) => {
  
  // try {
    const res = await axiosInstance.post('user/comment',{
      
    comment:comment,
    user_id:user_id,
    _id:id

    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});

export const showcomments = createAsyncThunk('user/showcomment', async (id) => {
 
  // try {
    const res = await axiosInstance.post('user/showcomment',{
    _id:id

    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  
});
export const showAnotherUser = createAsyncThunk('user/showuser', async (id) => {
  console.log(id);
    const res = await axiosInstance.post('user/showAcountUserProfile',{
      userid:id.userid,
      commentuserid:id.commentuser
    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
  
});
export const reportcontent = createAsyncThunk('user/reportContent', async (id) => {
  // console.log(id);
  // try {
    const res = await axiosInstance.post('user/reportcontent',{
      
    id:id.content_id,
    user_id:id.reported_user_id,
    reports:id.reports

    },{
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return res.data;
 
});


const userslice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(finduser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(finduser.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
        state.error = null; 
      })
      .addCase(finduser.rejected, (state, action) => {
        state.loading = true;
        state.content = [];
        state.error = action.error.message;
      })
      .addCase(setlike.fulfilled, (state, action) => {
       
        state.like = action.payload;
      
      })
      .addCase(follow.fulfilled, (state, action) => {
       
        state.follow = action.payload;
      
      })
      .addCase(addComment.fulfilled, (state, action) => {
       
        state.comment = action.payload;
      
      })

      .addCase(showcomments.fulfilled, (state, action) => {
       
        state.showcomment = action.payload;
   
      
      })
      .addCase(showAnotherUser.fulfilled, (state, action) => {
       
        state.showuser = action.payload;
        console.log(action.payload);
   
      
      })
      .addCase(reportcontent.fulfilled, (state, action) => {
       
        state.report = action.payload;
   
   
      
      })
  },
});

export default userslice.reducer;