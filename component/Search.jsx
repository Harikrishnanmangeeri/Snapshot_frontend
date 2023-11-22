import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useDispatch } from 'react-redux';
import { searchs } from '@/Redux/features/content';

export default function Search() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const search = e.target.value;
    dispatch(searchs(search));
  };

  const inputBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#f2f2f2',
    padding: '5px 10px',
    marginLeft: 20,
    width: '180%', 
    maxWidth: '500px', 
    margin: '0 auto', 
  };

  return (
    <div style={inputBaseStyles}>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        onChange={(e) => handleSearch(e)}
        style={{ marginLeft: 10, flex: 1 }} 
      />
    </div>
  );
}
