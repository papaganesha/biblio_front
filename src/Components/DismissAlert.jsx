import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function DismissAlert({type, text, setText}) {
  return (
    <Stack sx={{ width: '77%', mt: 1, mb:3, mr: 3}}>
      <Alert severity={type} onClose={() => {setText('')}}>{text}</Alert>
    </Stack>
  );
}


