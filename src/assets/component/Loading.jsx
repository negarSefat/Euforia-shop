import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularSize() {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '70vh',
      }}
    >
      <CircularProgress size="4rem" sx={{ color: '#244f7aff' }} />
    </Stack>
  );
}
