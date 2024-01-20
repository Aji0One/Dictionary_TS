import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "../styles/Loading.css";

interface LoadingProps {
  setLoading: (active: boolean) => void;
}

export default function Loading() {

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 500);
  // }, []);

  return (
    <div className='loading' data-testid='loading-component'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}