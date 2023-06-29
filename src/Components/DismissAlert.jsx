import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function DismissAlert({type, text, setError}) {
  return (
    <Stack sx={{ width: '100%', mt: 1.4 }} spacing={2}>
      <Alert severity={type} onClose={() => {setError('')}}>{text}</Alert>
    </Stack>
  );
}


