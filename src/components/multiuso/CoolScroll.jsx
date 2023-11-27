import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './CoolScroll.css'; // Create this CSS file

const CoolScroll = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '300px',
        height: '300px',
        overflowY: 'scroll',
        borderRadius: '10px',
        padding: '16px',
      }}
    >
      <Typography variant='h6'>Cool Scrollable Content</Typography>
      {/* Add your content here */}
    </Paper>
  );
};

export default CoolScroll;
