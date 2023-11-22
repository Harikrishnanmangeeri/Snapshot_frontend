'use client'
import { createSlice } from "@reduxjs/toolkit";

const initialState={
user:'',
search:'',
}

const ContentRedux = createSlice(
{
    name:'content',
    initialState:initialState,
    reducers:{
        content:(state,actions)=>{
            state.user=actions.payload
        },
        modal:(state,actions)=>{
            state.user=actions.payload
        },
        searchs:(state,actions)=>{
            state.search=actions.payload
            console.log(initialState.search);
        }
    } 
}

)
export const {content,modal,searchs}=ContentRedux.actions
export default ContentRedux.reducer